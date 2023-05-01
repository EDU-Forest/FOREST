package com.ssafy.forestworkbook.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.ssafy.forestworkbook.dto.workbook.request.WorkbookDetailDto;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Where;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import org.springframework.util.Assert;

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
    @Column(name = "updated_date")
    private LocalDateTime updatedDate;

    @Column(name = "is_deleted", columnDefinition = "tinyint(1) default 0", nullable = false)
    private Boolean isDeleted = false;

    @Builder
    public Workbook(WorkbookImg workbookImg, User creator, String title, String description, int volume) {
        this.workbookImg = workbookImg;
        this.creator = creator;
        this.title = title;
        this.description = description;
        this.volume = volume;
    }

    public void updateWorkbook(String title, WorkbookImg workbookImg, String description) {
        this.title = title;
        this.workbookImg = workbookImg;
        this.description = description;

    }

    public void changeIsPublid(boolean isPublic) {
        this.isPublic = isPublic;
    }

    public void changeIsExcuted(boolean isExecuted) {
        this.isExecuted = isExecuted;
    }
}
