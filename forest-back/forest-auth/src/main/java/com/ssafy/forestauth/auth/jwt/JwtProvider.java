package com.ssafy.forestauth.auth.jwt;

import com.ssafy.forestauth.auth.CustomOAuth2User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Component;

import java.util.*;
import java.util.stream.Collectors;

@Component
@Slf4j
public class JwtProvider {

    @Value("${jwt.token.secretKey}")
    private String secretKey;

//    public static final Long accessTokenValidateTime = 1000L * 60 * 60 * 24; // 하루
    public static final Long accessTokenValidateTime = 1000L * 5; // 5초
    public Long refreshTokenValidateTime = 1000L * 60 * 60 * 24 * 7; // 1주일
    private final String authoritiesKey = "role";

    public String createAccessToken(Authentication authentication) {
        Date now = new Date();
        Date validity = new Date(now.getTime() + accessTokenValidateTime);

        Long userId;
        if(authentication.getPrincipal() instanceof CustomOAuth2User) {
            userId = ((CustomOAuth2User) authentication.getPrincipal()).getUserId();
        } else {
            userId = Long.parseLong(((org.springframework.security.core.userdetails.User) authentication.getPrincipal()).getUsername());
        }

        log.info("userId : {}", userId);

        Map<String, Object> claims = new HashMap<>();
        claims.put("userId", userId);
        claims.put(authoritiesKey, "ROLE_USER");

        return Jwts.builder()
                .signWith(SignatureAlgorithm.HS512, secretKey)
                .setClaims(claims)
                .setSubject(userId.toString())
                .setIssuer("issuer")
                .setIssuedAt(now)
                .setExpiration(validity)
                .compact();
    }

    public String createAccessTokenCommon(Long userId) {
        Date now = new Date();
        Date validity = new Date(now.getTime() + accessTokenValidateTime);

        log.info("userId : {}", userId);

        Map<String, Object> claims = new HashMap<>();
        claims.put("userId", userId);
        claims.put(authoritiesKey, "ROLE_USER");

        return Jwts.builder()
                .signWith(SignatureAlgorithm.HS512, secretKey)
                .setClaims(claims)
                .setSubject(userId.toString())
                .setIssuer("issuer")
                .setIssuedAt(now)
                .setExpiration(validity)
                .compact();
    }

    public String createRefreshToken() {
        Date now = new Date();
        Date validity = new Date(now.getTime() + refreshTokenValidateTime);
        return Jwts.builder()
                .signWith(SignatureAlgorithm.HS512, secretKey)
                .claim(authoritiesKey, "ROLE_USER")
                .setIssuer("issuer")
                .setIssuedAt(now)
                .setExpiration(validity)
                .compact();
    }

    public Authentication getAuthentication(String accessToken) {
        System.out.println("accessToken = " + accessToken);
        Claims claims = parseClaims(accessToken);

        System.out.println("Claims = " + claims.toString());
        String userId = ((Map<String, Object>) claims).get("userId").toString();

        Collection<? extends GrantedAuthority> authorities =
                Arrays.stream(claims.get(authoritiesKey).toString().split(", "))
                        .map(SimpleGrantedAuthority::new).collect(Collectors.toList());

        User principal = new User(userId, "", authorities);
        return new UsernamePasswordAuthenticationToken(principal, accessToken, authorities);
    }

    public Claims parseClaims(String accessToken) {
        try {
            return Jwts.parser().setSigningKey(secretKey).parseClaimsJws(accessToken).getBody();
        } catch(ExpiredJwtException e) {
            return e.getClaims();
        }
    }

    public boolean validateToken(String token) {
        Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token);
        return true;
    }
}
