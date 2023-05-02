package com.ssafy.forestauth.auth;

import com.ssafy.forestauth.entity.User;
import com.ssafy.forestauth.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class CustomOAuth2UserService extends DefaultOAuth2UserService {
    private final UserRepository userRepository;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2User oAuth2User = super.loadUser(userRequest);

        String registrationId = userRequest.getClientRegistration().getRegistrationId();
        String userNameAttributeName = userRequest.getClientRegistration().getProviderDetails().getUserInfoEndpoint().getUserNameAttributeName();

        OAuthAttributes attributes = OAuthAttributes.of(registrationId, oAuth2User.getAttributes());

        User user = saveOrUpdate(registrationId, attributes);

        return new CustomOAuth2User(
                Collections.singleton(new SimpleGrantedAuthority("ROLE_USER")),
                attributes.getAttributes(),
                attributes.getNameAttributekey(),
                user.getId(),
                user.getEmail()
        );

    }

    private User saveOrUpdate(String registerationId, OAuthAttributes oAuthAttributes) {
        User user = oAuthAttributes.toEntity(registerationId);
        Optional<User> findUserByEmail = userRepository.findByEmail(user.getEmail());

        // 처음 가입 이메일인 경우
        if (findUserByEmail.isEmpty()) {
            userRepository.save(user);
            return user;
        }
        // 기존 회원인 경우
        else {
            return findUserByEmail.get();
        }
    }
}
