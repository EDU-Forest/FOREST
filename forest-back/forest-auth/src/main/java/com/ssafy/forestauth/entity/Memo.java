package com.ssafy.forestauth.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.ssafy.forestauth.dto.memo.SaveMemoRequestDto;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Where;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor
@Table(name = "memos")
@EntityListeners(AuditingEntityListener.class)
@Where(clause = "is_deleted = false")
public class Memo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", columnDefinition = "bigint", nullable = false)
    private Long id;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "content", columnDefinition = "varchar(200)")
    private String content;

    @CreatedDate
    @Column(name = "created_date", updatable = false, nullable = false)
    private LocalDateTime createdDate;

    @LastModifiedDate
    @Column(name = "updated_date", updatable = false, nullable = false)
    private LocalDateTime updatedDate;

    @Column(name = "is_deleted", columnDefinition = "tinyint(1) default 0", nullable = false)
    private Boolean isDeleted = false;

    public void createMemo(User user, SaveMemoRequestDto saveMemoRequestDto) {
        this.user = user;
        this.content = saveMemoRequestDto.getContent();
    }

    public void updateDelete(Boolean isDeleted) {
        this.isDeleted = isDeleted;
    }
}

