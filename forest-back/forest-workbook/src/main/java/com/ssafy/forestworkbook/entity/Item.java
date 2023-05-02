package com.ssafy.forestworkbook.entity;


import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor
@Table(name = "items")
@Where(clause = "is_deleted = false")
@SQLDelete(sql = "UPDATE items SET is_deleted = true WHERE id = ?")
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

    @Builder
    public Item(Problem problem, int no, String content, Boolean isImage) {
        this.problem = problem;
        this.no = no;
        this.content = content;
        this.isImage = isImage;
    }

    public void updateItem(int no, String content, Boolean isImage) {
        this.no = no;
        this.content = content;
        this.isImage = isImage;
    }

}
