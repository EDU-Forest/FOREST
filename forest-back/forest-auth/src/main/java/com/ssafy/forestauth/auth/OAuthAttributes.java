package com.ssafy.forestauth.auth;

import com.ssafy.forestauth.entity.User;
import com.ssafy.forestauth.enumeration.EnumUserProviderStatus;
import lombok.Builder;
import lombok.Getter;

import java.security.AuthProvider;
import java.util.Map;

@Getter
@Builder
public class OAuthAttributes {
    private Map<String, Object> attributes;
    private String nameAttributekey;

    private String nickname;
    private String email;

     public static OAuthAttributes of(String socialName, Map<String, Object> attributes) {
         if(socialName.toUpperCase().equalsIgnoreCase("KAKAO")) {
             return ofKakao("id", attributes);
         }
         return null;
     }

     public static OAuthAttributes ofKakao(String userNameAttributeName, Map<String, Object> attributes) {
         Map<String, Object> kakaoAccount = (Map<String, Object>) attributes.get("kakao_account");

         return OAuthAttributes.builder()
                 .email((String) kakaoAccount.get("email"))
                 .nameAttributekey(userNameAttributeName)
                 .attributes(attributes)
                 .build();
     }

     public User toEntity(String registrationId) {
         return User.builder()
                 .email(email)
                 .authProvider(EnumUserProviderStatus.valueOf(registrationId.toUpperCase()))
                 .build();
     }
}
