package com.ssafy.forestauth.repository;

import com.ssafy.forestauth.entity.User;
import com.ssafy.forestauth.enumeration.EnumUserProviderStatus;
import com.ssafy.forestauth.enumeration.EnumUserRoleStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import javax.swing.text.html.Option;
import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    Optional<User> findByEmailAndAuthProvider(String email, EnumUserProviderStatus status);
    List<User> findByNameStartsWithAndRole(String name, EnumUserRoleStatus status);
}
