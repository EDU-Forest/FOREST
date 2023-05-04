package com.ssafy.forestworkbook.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.SQLDelete;
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
@SQLDelete(sql = "UPDATE workbooks SET is_deleted = true WHERE id = ?")
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

    @Column(name = "is_deploy", columnDefinition = "tinyint(1) default 0", nullable = false)
    private Boolean isDeploy = false;

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

    public void updateVolume(int volume) {
        this.volume = volume;
    }
    // 공개 여부
    public void changeIsPublic(boolean isPublic) {
        this.isPublic = isPublic;
    }

    // 배포 여부
    public void changeIsDeploy(boolean isDeploy) {
        this.isDeploy = isDeploy;
    }

    // 출제 여부
    public void changeIsExcuted(boolean isExecuted) {
        this.isExecuted = isExecuted;
    }
}
