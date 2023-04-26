package com.ssafy.forestauth.repository;

import com.ssafy.forestauth.entity.Memo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemoRepository extends JpaRepository<Memo, Long> {
}
