package com.ssafy.foreststudy.repository;

import com.ssafy.foreststudy.entity.ClassEntity;
import com.ssafy.foreststudy.entity.ClassUser;
import com.ssafy.foreststudy.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ClassUserRepository extends JpaRepository<ClassUser, Long> {

    Optional<ClassUser> findAllByClassesAndUser(ClassEntity classes, User user);

    List<ClassUser> findAllByClasses(ClassEntity classes);
}
