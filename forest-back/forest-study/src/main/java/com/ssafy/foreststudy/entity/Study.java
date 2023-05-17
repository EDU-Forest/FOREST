package com.ssafy.foreststudy.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.ssafy.foreststudy.enumeration.EnumStudyTypeStatus;
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

    public void updateEndTime(LocalDateTime endTime){
        this.endTime = endTime;
    }
}
