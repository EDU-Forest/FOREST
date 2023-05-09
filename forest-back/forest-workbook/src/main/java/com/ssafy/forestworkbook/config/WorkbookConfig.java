package com.ssafy.forestworkbook.config;


import org.apache.coyote.http2.Http2Protocol;
import org.springframework.boot.autoconfigure.web.ServerProperties;
import org.springframework.boot.autoconfigure.web.embedded.NettyWebServerFactoryCustomizer;
import org.springframework.boot.web.embedded.netty.NettyReactiveWebServerFactory;
import org.springframework.boot.web.embedded.tomcat.TomcatServletWebServerFactory;
import org.springframework.boot.web.servlet.server.ConfigurableServletWebServerFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;

import java.util.Arrays;

@Configuration
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
