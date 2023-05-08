package com.ssafy.foreststudy.repository;

import com.ssafy.foreststudy.entity.Class;
import com.ssafy.foreststudy.entity.Study;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

public interface ClassRepository extends JpaRepository<Class, Long> {

}
