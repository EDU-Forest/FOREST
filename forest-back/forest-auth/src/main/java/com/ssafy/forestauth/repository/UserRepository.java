package com.ssafy.forestauth.repository;

import com.ssafy.forestauth.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
}
