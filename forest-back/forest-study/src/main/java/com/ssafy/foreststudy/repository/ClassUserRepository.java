package com.ssafy.foreststudy.repository;

import com.ssafy.foreststudy.entity.Class;
import com.ssafy.foreststudy.entity.ClassUser;
import com.ssafy.foreststudy.entity.Study;
import com.ssafy.foreststudy.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ClassUserRepository extends JpaRepository<ClassUser, Long> {

    Optional<ClassUser> findAllByClassesAndUser(Class classes, User user);
}
