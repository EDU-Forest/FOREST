package com.ssafy.forestauth.repository;

import com.ssafy.forestauth.entity.ClassEntity;
import com.ssafy.forestauth.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ClassRepository extends JpaRepository<ClassEntity, Long> {
    List<ClassEntity> findAllByOwner(User user);

    Optional<ClassEntity> findByName(String name);
    Optional<ClassEntity> findTopByOwnerOrderByCreatedDateDesc(User owner);
}
