package com.ssafy.foreststudy.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
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
@Table(name = "workbooks")
@EntityListeners(AuditingEntityListener.class)
@Where(clause = "is_deleted = false")
public class Workbook {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", columnDefinition = "bigint", nullable = false)
    private Long id;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "workbook_imgs_id", nullable = false)
    private WorkbookImg workbookImg;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "creator_id", nullable = false)
    private User creator;

    @Column(name = "title", columnDefinition = "varchar(30)", nullable = false)
    private String title;

    @Column(name = "description", columnDefinition = "varchar(255)")
    private String description;

    @Column(name = "volume", columnDefinition = "int default 0", nullable = false)
    private int volume;

    @Column(name = "is_executed", columnDefinition = "tinyint(1) default 0", nullable = false)
    private Boolean isExecuted = false;

    @Column(name = "is_public", columnDefinition = "tinyint(1) default 0", nullable = false)
    private Boolean isPublic = false;

    @CreatedDate
    @Column(name = "created_date", updatable = false, nullable = false)
    private LocalDateTime createdDate;

    @LastModifiedDate
    @Column(name = "updated_date", nullable = false)
    private LocalDateTime updatedDate;

    @Column(name = "is_deleted", columnDefinition = "tinyint(1) default 0", nullable = false)
    private Boolean isDeleted = false;
}
