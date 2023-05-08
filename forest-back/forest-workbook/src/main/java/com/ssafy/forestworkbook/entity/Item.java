package com.ssafy.forestworkbook.entity;


import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Where;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor
@Table(name = "items")
@Where(clause = "is_deleted = false")
public class Item {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", columnDefinition = "bigint", nullable = false)
    private Long id;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "problem_id", nullable = false)
    private Problem problem;

    @Column(name = "no", columnDefinition = "int", nullable = false)
    private int no;

    @Column(name = "content", columnDefinition = "varchar(255)", nullable = false)
    private String content;

    @Column(name = "is_image", columnDefinition = "tinyint(1) default 0", nullable = false)
    private Boolean isImage;

    @Column(name = "is_deleted", columnDefinition = "tinyint(1) default 0", nullable = false)
    private Boolean isDeleted = false;
}
