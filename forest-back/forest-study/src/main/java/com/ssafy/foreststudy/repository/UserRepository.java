package com.ssafy.foreststudy.repository;

import com.ssafy.foreststudy.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {


}
