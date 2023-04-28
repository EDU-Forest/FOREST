package com.ssafy.forestauth.repository;

import com.ssafy.forestauth.entity.Class;
import com.ssafy.forestauth.entity.ClassUser;
import com.ssafy.forestauth.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ClassUserRepository extends JpaRepository<ClassUser, Long> {
    List<ClassUser> findAllByUser(User user);

    Optional<ClassUser> findByClasses(Class classes);
}
