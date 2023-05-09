package com.ssafy.forestworkbook.config;

import org.apache.coyote.UpgradeProtocol;
import org.apache.coyote.http2.Http2Protocol;
import org.springframework.boot.web.embedded.tomcat.TomcatConnectorCustomizer;
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
public class WorkbookConfig {

    @Bean
    public TomcatConnectorCustomizer http2ProtocolCustomizer() {
        return (connector) -> {
            for (UpgradeProtocol upgradeProtocol: connector.findUpgradeProtocols()) {
                if (upgradeProtocol instanceof Http2Protocol) {
                    Http2Protocol http2Protocol = (Http2Protocol)upgradeProtocol;
                    http2Protocol.setOverheadContinuationThreshold(0);
                    http2Protocol.setOverheadDataThreshold(0);
                    http2Protocol.setOverheadWindowUpdateThreshold(0);
                }
            }
        };
    }
}
