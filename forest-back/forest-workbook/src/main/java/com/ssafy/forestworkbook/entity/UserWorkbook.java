package com.ssafy.forestworkbook.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Where;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor
@Table(name = "user_workbooks")
@Where(clause = "is_deleted = false")
public class UserWorkbook {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", columnDefinition = "bigint", nullable = false)
    private Long id;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "workbook_id", nullable = false)
    private Workbook workbook;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "is_bookmarked", columnDefinition = "tinyint(1) default 0", nullable = false)
    private Boolean isBookmarked = false;

    @Column(name = "is_scraped", columnDefinition = "tinyint(1) default 0", nullable = false)
    private Boolean isScraped = false;

    @Column(name = "is_deleted", columnDefinition = "tinyint(1) default 0", nullable = false)
    private Boolean isDeleted = false;

    @Builder
    public UserWorkbook(Workbook workbook, User user, Boolean isBookmarked) {
        this.workbook = workbook;
        this.user = user;
        this.isBookmarked = isBookmarked;
    }

    public void updateIsBookmarked(boolean isBookmarked) {
        this.isBookmarked = isBookmarked;
    }
}
