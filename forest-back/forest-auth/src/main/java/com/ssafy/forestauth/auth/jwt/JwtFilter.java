package com.ssafy.forestauth.auth.jwt;

import com.ssafy.forestauth.enumeration.response.ErrorCode;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.UnsupportedJwtException;
import io.jsonwebtoken.security.SignatureException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
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

@Component
@Slf4j
@RequiredArgsConstructor
public class JwtFilter extends OncePerRequestFilter {

    public static final String AUTHORIZATION_HEADER = "Authorization";
    private final JwtProvider jwtProvider;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String jwt = getToken(request);
        String requestURI = request.getRequestURI();

        log.info("request method : {}", request.getMethod());
        log.info("request uri : {}", requestURI);
        log.info("request access token : {}", jwt);

        // Token 정상 여부 확인
        try {
            if(jwt == null) {
                log.info("JWT 값이 NULL 입니다!!");
                request.setAttribute("exception", ErrorCode.AUTH_WRONG_TOKEN);
            }
            else if(StringUtils.hasText(jwt) && jwtProvider.validateToken(jwt)) {
                Authentication authentication = jwtProvider.getAuthentication(jwt);
                SecurityContextHolder.getContext().setAuthentication(authentication);
                log.info("Secret Context에 '{}' 인증 정보 저장 완료!", authentication.getName());
            }
        } catch (SignatureException | MalformedJwtException e) {
            log.info("유효하지 않은 토큰");
            request.setAttribute("exception", ErrorCode.AUTH_NOT_VALID_TOKEN);
        } catch (ExpiredJwtException e) {
            log.info("만료된 토큰");
            request.setAttribute("exception", ErrorCode.AUTH_EXPIRED_TOKEN);
        } catch (UnsupportedJwtException e) {
            log.info("지원하지 않은 토큰");
            request.setAttribute("exception", ErrorCode.AUTH_UNSUPPORTED_TOKEN);
        } catch (JwtException e) {
            log.info("잘못된 토큰");
            request.setAttribute("exception", ErrorCode.AUTH_WRONG_TOKEN);
        } catch(Exception e) {
            log.info("JWT 값이 : {}", jwt);
            request.setAttribute("excetion", ErrorCode.AUTH_WRONG_TOKEN);
        }

        filterChain.doFilter(request, response);
    }

    // Request 요청 시, Header에서 Token 정보 꺼내기
    private String getToken(HttpServletRequest request) {
        String bearerToken = request.getHeader(AUTHORIZATION_HEADER);

        if(StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer")) {
            return bearerToken.substring(7);
        }
        return null;
    }
}
