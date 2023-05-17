package com.ssafy.forestauth.entity;

import com.ssafy.forestauth.dto.user.SignupRequestDto;
import com.ssafy.forestauth.dto.user.SignupSocialRequestDto;
import com.ssafy.forestauth.enumeration.EnumUserProviderStatus;
import com.ssafy.forestauth.enumeration.EnumUserRoleStatus;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Where;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor
@Table(name = "users")
@EntityListeners(AuditingEntityListener.class)
@Where(clause = "is_deleted = false")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", columnDefinition = "bigint", nullable = false)
    private Long id;

    @Column(name = "email", columnDefinition = "varchar(50)", nullable = false)
    private String email;

    @Column(name = "name", columnDefinition = "varchar(20)", nullable = false)
    private String name;

    @Column(name = "password", columnDefinition = "varchar(60)")
    private String password;

    @Column(name = "phone", columnDefinition = "varchar(20)")
    private String phone;

    @Column(name = "birth", columnDefinition = "date")
    private LocalDate birth;

    @Enumerated(EnumType.STRING)
    @Column(name = "role", columnDefinition = "varchar(10) default 'STUDENT'")
    private EnumUserRoleStatus role;

    @Enumerated(EnumType.STRING)
    @Column(name = "auth_provider", columnDefinition = "varchar(10) default 'LOCAL'")
    private EnumUserProviderStatus authProvider;

    @Column(name = "refresh_token", columnDefinition = "varchar(255)")
    private String refreshToken;

    @CreatedDate
    @Column(name = "created_date", updatable = false, nullable = false)
    private LocalDateTime createdDate;

    @Column(name = "is_deleted", columnDefinition = "tinyint(1) default 0", nullable = false)
    private Boolean isDeleted = false;

    @Builder
    public User(String email, String name, EnumUserProviderStatus authProvider, String refreshToken) {
        this.email = email;
        this.name = name;
        this.authProvider = authProvider;
        this.refreshToken = refreshToken;
    }

    public void createUser(SignupRequestDto signupRequestDto) {
        this.name = signupRequestDto.getName();
        this.email = signupRequestDto.getEmail();
        this.phone = signupRequestDto.getPhone();
        this.password = signupRequestDto.getPw();
        this.birth = signupRequestDto.getBirth();
        this.role = signupRequestDto.getRole();
        this.authProvider = signupRequestDto.getProvider();
    }

    public void encodePassword(String encodedPw) {
        this.password = encodedPw;
    }

    public void updateRefreshToken(String refreshToken) {
        this.refreshToken = refreshToken;
    }

    public void updateUserInfo(SignupSocialRequestDto signupSocialRequestDto) {
        this.name = signupSocialRequestDto.getName();
        this.phone = signupSocialRequestDto.getPhone();
        this.birth = signupSocialRequestDto.getBirth();
        this.role = signupSocialRequestDto.getRole();
        this.authProvider = signupSocialRequestDto.getProvider();
    }
}
