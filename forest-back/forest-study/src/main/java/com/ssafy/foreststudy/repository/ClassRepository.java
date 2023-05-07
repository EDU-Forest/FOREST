package com.ssafy.foreststudy.repository;

import com.ssafy.foreststudy.entity.ClassEntity;
import com.ssafy.foreststudy.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ClassRepository extends JpaRepository<ClassEntity, Long> {

    List<ClassEntity> findAllByOwner(User user);
}
