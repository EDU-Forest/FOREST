package com.ssafy.forestauth.auth.jwt;

import com.nimbusds.jose.shaded.json.JSONObject;
import com.ssafy.forestauth.enumeration.response.ErrorCode;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.UnsupportedJwtException;
import io.jsonwebtoken.security.SignatureException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.Arrays;
import java.util.List;

@Component
@Slf4j
@RequiredArgsConstructor
public class JwtFilter extends OncePerRequestFilter {

    public static final String AUTHORIZATION_HEADER = "Authorization";
    private final JwtProvider jwtProvider;
    private final List<String> excludedUrlList = Arrays.asList(
            "/api/auth/reissue",
            "/api/user/check",
            "/api/user/common",
            "/api/user/login",
            "/api/oauth2/authorization/kakao",
            "/api/msg",
            "/api/class/search"
    );

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String jwt = getToken(request);
        String requestURI = request.getRequestURI();

        if(skipFilterUrl(requestURI)) {
            log.info("skip url : {}", requestURI);
            filterChain.doFilter(request, response);
            return;
        }

        log.info("request method : {}", request.getMethod());
        log.info("request uri : {}", requestURI);
        log.info("request access token : {}", jwt);

        // Token 정상 여부 확인
        try {
            if(jwt == null) {
                log.info("JWT 값이 NULL 입니다!!");
                request.setAttribute("exception", ErrorCode.AUTH_WRONG_TOKEN);
                errorResponseMethod(response, ErrorCode.AUTH_WRONG_TOKEN);
                return;
            }
            else if(StringUtils.hasText(jwt) && jwtProvider.validateToken(jwt)) {
                Authentication authentication = jwtProvider.getAuthentication(jwt);
                SecurityContextHolder.getContext().setAuthentication(authentication);
                log.info("Secret Context에 '{}' 인증 정보 저장 완료!", authentication.getName());
            }
        } catch (SignatureException | MalformedJwtException e) {
            log.info("유효하지 않은 토큰");
            errorResponseMethod(response, ErrorCode.AUTH_NOT_VALID_TOKEN);
            return;
        } catch (ExpiredJwtException e) {
            log.info("만료된 토큰");
            errorResponseMethod(response, ErrorCode.AUTH_EXPIRED_TOKEN);
            return;
        } catch (UnsupportedJwtException e) {
            log.info("지원하지 않은 토큰");
            errorResponseMethod(response, ErrorCode.AUTH_UNSUPPORTED_TOKEN);
            return;
        } catch (JwtException e) {
            log.info("잘못된 토큰");
            errorResponseMethod(response, ErrorCode.AUTH_WRONG_TOKEN);
            return;
        } catch(Exception e) {
            log.info("JWT 값이 : {}", jwt);
            request.setAttribute("exception", ErrorCode.AUTH_WRONG_TOKEN);
            errorResponseMethod(response, ErrorCode.AUTH_WRONG_TOKEN);
            return;
        }

        filterChain.doFilter(request, response);
    }

    private static void errorResponseMethod(HttpServletResponse response, ErrorCode errorCode) throws IOException {
        response.setContentType("application/json;charset=UTF-8");
        response.setStatus(HttpServletResponse.SC_FORBIDDEN);

        JSONObject responseJson = new JSONObject();
        responseJson.put("code", HttpStatus.FORBIDDEN.value());
        responseJson.put("message", errorCode);
        response.getWriter().write(String.valueOf(responseJson));
    }

    // Request 요청 시, Header에서 Token 정보 꺼내기
    private String getToken(HttpServletRequest request) {
        String bearerToken = request.getHeader(AUTHORIZATION_HEADER);

        if(StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer")) {
            return bearerToken.substring(7);
        }
        return null;
    }

    private boolean skipFilterUrl(String requestUrl) {
        return excludedUrlList.stream().anyMatch(requestUrl::equals);
    }
}
