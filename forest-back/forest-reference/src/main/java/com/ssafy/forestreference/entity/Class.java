package com.ssafy.forestreference.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Where;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor
@Table(name = "classes")
@EntityListeners(AuditingEntityListener.class)
@Where(clause = "is_deleted = false")
public class Class {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", columnDefinition = "bigint", nullable = false)
    private Long id;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "owner_id", nullable = false)
    private User owner;

    @Column(name = "name", columnDefinition = "varchar(20)", nullable = false)
    private String name;

    @CreatedDate
    @Column(name = "created_date", updatable = false, nullable = false)
    private LocalDateTime createdDate;

    @Column(name = "is_deleted", columnDefinition = "tinyint(1) default 0", nullable = false)
    private Boolean isDeleted = false;
}
