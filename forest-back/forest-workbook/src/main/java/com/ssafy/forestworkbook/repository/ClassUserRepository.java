package com.ssafy.forestworkbook.repository;

import com.ssafy.forestworkbook.entity.ClassEntity;
import com.ssafy.forestworkbook.entity.ClassUser;
import com.ssafy.forestworkbook.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ClassUserRepository extends JpaRepository<ClassUser, Long> {

    Optional<ClassUser> findByClassesAndUser(ClassEntity classEntity, User user);

}
