package com.ssafy.forestauth.repository;

import com.ssafy.forestauth.entity.ClassUser;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClassUserRepository extends JpaRepository<ClassUser, Long> {
}