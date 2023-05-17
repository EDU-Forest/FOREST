package com.ssafy.foreststudy.entity;


import com.ssafy.foreststudy.enumeration.EnumUserProviderStatus;
import com.ssafy.foreststudy.enumeration.EnumUserRoleStatus;
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

    @Column(name = "name", columnDefinition = "varchar(20)")
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
}
