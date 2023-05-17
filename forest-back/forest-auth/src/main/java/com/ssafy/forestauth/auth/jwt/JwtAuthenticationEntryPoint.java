package com.ssafy.forestauth.auth.jwt;

import com.nimbusds.jose.shaded.json.JSONObject;
import com.ssafy.forestauth.enumeration.response.ErrorCode;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Slf4j
@Component
public class JwtAuthenticationEntryPoint implements AuthenticationEntryPoint {
    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException) throws IOException, ServletException {

        // 유효한 자격증명하지 못하고 접근 -> 401
        ErrorCode exception = (ErrorCode) request.getAttribute("exception");

        response.setContentType("application/json;charset=UTF-8");
        response.setStatus(HttpServletResponse.SC_FORBIDDEN);

        JSONObject responseJson = new JSONObject();
        responseJson.put("code", HttpStatus.FORBIDDEN.value());
        responseJson.put("message", exception);

        log.info("JwtAuthentication EntryPoint Spot!");
        response.getWriter().write(String.valueOf(responseJson));
    }
}
