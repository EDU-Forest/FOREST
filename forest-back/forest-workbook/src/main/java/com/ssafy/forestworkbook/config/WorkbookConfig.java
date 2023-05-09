package com.ssafy.forestworkbook.config;

import org.apache.coyote.http2.Http2Protocol;
import org.springframework.boot.web.embedded.tomcat.TomcatServletWebServerFactory;
import org.springframework.boot.web.servlet.server.ConfigurableServletWebServerFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.Arrays;

@Configuration
@EnableWebSecurity
public class WorkbookConfig {

    @Bean
    public ConfigurableServletWebServerFactory tomcatCustomizer() {
        TomcatServletWebServerFactory factory = new TomcatServletWebServerFactory();

        Http2Protocol protocol = new Http2Protocol();
        protocol.setOverheadDataThreshold(0);
        factory.addConnectorCustomizers(connector -> connector.addUpgradeProtocol(protocol));
        return factory;
    }

}
