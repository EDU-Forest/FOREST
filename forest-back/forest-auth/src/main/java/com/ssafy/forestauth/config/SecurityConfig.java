package com.ssafy.forestauth.config;

import com.ssafy.forestauth.auth.CustomOAuth2UserService;
import com.ssafy.forestauth.auth.OAuth2LoginSuccessHandler;
import com.ssafy.forestauth.auth.jwt.JwtAccessDeniedHandler;
import com.ssafy.forestauth.auth.jwt.JwtAuthenticationEntryPoint;
import com.ssafy.forestauth.auth.jwt.JwtFilter;
import com.ssafy.forestauth.errorhandling.exception.service.InvalidTokenException;
import com.ssafy.forestauth.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

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
//                .authorizeRequests().antMatchers("/api/user/check", "/api/user/common", "/api/user/social", "/api/user/login", "/api/msg", "/api/class/search")
                .authorizeRequests()
                .antMatchers(
                        "**/api/user/search/**",
                        "**/api/user/check/**",
                        "**/api/user/common/**",
                        "**/api/user/login/**",
                        "**/api/msg/**",
                        "**/api/class/search/**",
                        "**/api/workbook/search/**",
                        "**/api/workbook/best/**",
                        "**/api/workbook/recent/**"
                ).permitAll()
                .antMatchers("/api/**").authenticated()
                .anyRequest().permitAll()

                // JWT
                .and()
                .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class)
                .addFilterBefore(jwtFilter, JwtFilter.class)

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
        configuration.addAllowedOrigin("*");
        configuration.addAllowedHeader("*");
        configuration.addAllowedMethod("*");
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

}
