package com.ssafy.forestauth.auth.jwt;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.forestauth.enumeration.response.ErrorCode;
import com.ssafy.forestauth.errorhandling.exception.service.InvalidTokenException;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.UnsupportedJwtException;
import io.jsonwebtoken.security.SignatureException;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
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
            if(StringUtils.hasText(jwt) && jwtProvider.validateToken(jwt)) {
                Authentication authentication = jwtProvider.getAuthentication(jwt);
                SecurityContextHolder.getContext().setAuthentication(authentication);
                log.info("Secret Context에 '{}' 인증 정보 저장 완료!", authentication.getName());
            }
        } catch (SignatureException | MalformedJwtException e) {
            System.out.println("유효하지 않는 토큰");
            request.setAttribute("exception", ErrorCode.AUTH_NOT_VALID_TOKEN);
            setErrorResponse(response);
//            throw new InvalidTokenException(ErrorCode.AUTH_WRONG_TOKEN);
            throw new RuntimeException(ErrorCode.AUTH_WRONG_TOKEN.getMessage());
        } catch (ExpiredJwtException e) {
            System.out.println("만료된 토큰");
            request.setAttribute("exception", ErrorCode.AUTH_EXPIRED_TOKEN);
            throw new InvalidTokenException(ErrorCode.AUTH_WRONG_TOKEN);
        } catch (UnsupportedJwtException e) {
            System.out.println("지원하지 않은 토큰");
            request.setAttribute("exception", ErrorCode.AUTH_UNSUPPORTED_TOKEN);
            throw new InvalidTokenException(ErrorCode.AUTH_WRONG_TOKEN);
        } catch (JwtException e) {
            System.out.println("토큰 잘못됨");
            request.setAttribute("exception", ErrorCode.AUTH_WRONG_TOKEN);
            throw new InvalidTokenException(ErrorCode.AUTH_WRONG_TOKEN);
        }

        filterChain.doFilter(request, response);
    }

    private void setErrorResponse(
            HttpServletResponse response
    ){
        ObjectMapper objectMapper = new ObjectMapper();
        response.setStatus(ErrorCode.AUTH_WRONG_TOKEN.getStatus().value());
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        ErrorResponse errorResponse = new ErrorResponse(ErrorCode.AUTH_WRONG_TOKEN.getStatus().value(), ErrorCode.AUTH_WRONG_TOKEN.getMessage());
        try{
            System.out.println("before");
            response.getWriter().write(objectMapper.writeValueAsString(errorResponse));
            System.out.println("after");
        }catch (IOException e){
            e.printStackTrace();
        }
    }

    @Data
    public static class ErrorResponse{
        private final Integer code;
        private final String message;
    }

    // Request 요청 시, Header에서 Token 정보 꺼내기
    private String getToken(HttpServletRequest request) {
        String bearerToken = request.getHeader(AUTHORIZATION_HEADER);

        if(StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer")) {
            System.out.println("제대로된 토큰 값");
            return bearerToken.substring(7);
        }
        System.out.println("잘못된 토큰 값");
        return null;
    }
}
