package com.ssafy.forestauth.repository;

import com.ssafy.forestauth.entity.Memo;
import com.ssafy.forestauth.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MemoRepository extends JpaRepository<Memo, Long> {
    List<Memo> findAllByUser(User user);
}
