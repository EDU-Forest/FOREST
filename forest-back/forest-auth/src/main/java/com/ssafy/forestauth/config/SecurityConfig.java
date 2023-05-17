package com.ssafy.forestauth.config;

import com.ssafy.forestauth.auth.CustomOAuth2UserService;
import com.ssafy.forestauth.auth.OAuth2LoginSuccessHandler;
import com.ssafy.forestauth.auth.jwt.JwtAccessDeniedHandler;
import com.ssafy.forestauth.auth.jwt.JwtAuthenticationEntryPoint;
import com.ssafy.forestauth.auth.jwt.JwtFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.Arrays;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig implements WebMvcConfigurer {
    private final OAuth2LoginSuccessHandler oAuth2LoginSuccessHandler;
    private final CustomOAuth2UserService customOAuth2UserService;
    private final JwtFilter jwtFilter;
    private final JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;
    private final JwtAccessDeniedHandler jwtAccessDeniedHandler;


    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .cors().configurationSource(corsConfigurationSource())
                .and()
                .csrf().disable()
                .httpBasic().disable()
                .formLogin().disable()

                // 요청 URL 권한
                .authorizeRequests()
                .antMatchers(
                        "/api/user/check",
                        "/api/user/search",
                        "/api/user/common",
                        "/api/user/login",
                        "/api/oauth2/authorization/kakao",
                        "/api/auth/reissue",
                        "/api/msg",
                        "/api/class/search"
                ).permitAll()
                .antMatchers("/api/**").authenticated()
                .anyRequest().permitAll()

                // JWT
                .and()
                .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class)

                // 예외 처리
                .exceptionHandling()
                .authenticationEntryPoint(jwtAuthenticationEntryPoint)
                .accessDeniedHandler(jwtAccessDeniedHandler)

                // 세션 사용 X
                .and()
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)

                // 소셜 로그인 설정
                .and().oauth2Login()
                .successHandler(oAuth2LoginSuccessHandler)
                .userInfoEndpoint()
                .userService(customOAuth2UserService);
        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowCredentials(true);

        configuration.setAllowedOriginPatterns(Arrays.asList("*"));
        configuration.setAllowedMethods(Arrays.asList("HEAD","POST","GET","DELETE","PATCH", "OPTIONS"));
        configuration.setAllowedHeaders(Arrays.asList("*"));
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}
