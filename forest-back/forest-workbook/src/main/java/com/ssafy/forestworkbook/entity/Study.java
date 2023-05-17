package com.ssafy.forestworkbook.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.ssafy.forestworkbook.enumeration.EnumStudyTypeStatus;
import lombok.Builder;
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
@Table(name = "studies")
@EntityListeners(AuditingEntityListener.class)
@Where(clause = "is_deleted = false")
public class Study {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", columnDefinition = "bigint", nullable = false)
    private Long id;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "class_id", nullable = false)
    private ClassEntity classes;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "workbook_id", nullable = false)
    private Workbook workbook;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "name", columnDefinition = "varchar(20)", nullable = false)
    private String name;

    @Enumerated(EnumType.STRING)
    @Column(name = "type", columnDefinition = "varchar(10) default 'SELF'")
    private EnumStudyTypeStatus type;

    @Column(name = "start_time", columnDefinition = "timestamp")
    private LocalDateTime startTime;

    @Column(name = "end_time", columnDefinition = "timestamp")
    private LocalDateTime endTime;

    @CreatedDate
    @Column(name = "created_date", updatable = false, nullable = false)
    private LocalDateTime createdDate;

    @Column(name = "is_deleted", columnDefinition = "tinyint(1) default 0", nullable = false)
    private Boolean isDeleted = false;

    @Builder
    public Study(ClassEntity classes, Workbook workbook, User user, String name, EnumStudyTypeStatus type, LocalDateTime startTime, LocalDateTime endTime) {
        this.classes = classes;
        this.workbook = workbook;
        this.user = user;
        this.name = name;
        this.type = type;
        this.startTime = startTime;
        this.endTime = endTime;
    }
}
