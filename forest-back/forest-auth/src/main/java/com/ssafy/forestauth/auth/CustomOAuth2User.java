package com.ssafy.forestauth.auth;

import lombok.Getter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;

import java.util.Collection;
import java.util.Map;
import java.util.Objects;

@Getter
public class CustomOAuth2User extends DefaultOAuth2User {

    private Long userId;
    private String email;

    public CustomOAuth2User(Collection<? extends GrantedAuthority> authorities,
                            Map<String, Object> attributes,
                            String nameAttributeKey,
                            Long userId,
                            String email) {
        super(authorities, attributes, nameAttributeKey);
        this.userId = userId;
        this.email = email;
    }
}
