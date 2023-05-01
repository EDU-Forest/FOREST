package com.ssafy.forestauth.repository;

import com.ssafy.forestauth.entity.Class;
import com.ssafy.forestauth.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ClassRepository extends JpaRepository<Class, Long> {
    List<Class> findAllByOwner(User user);

    Optional<Class> findByName(String name);
    Optional<Class> findTopByOwnerOrderByCreatedDateDesc(User owner);
}
