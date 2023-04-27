package com.ssafy.forestauth.repository;

import com.ssafy.forestauth.entity.User;
import com.ssafy.forestauth.enumeration.EnumUserRoleStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    List<User> findByNameStartsWithAndRole(String name, EnumUserRoleStatus status);
}
