package com.ssafy.forestreference.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Where;

import javax.persistence.*;

@Entity
@Table(name = "cheering_msgs")
@Getter
@NoArgsConstructor
@Where(clause = "is_deleted = false")
public class CheeringMsg {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", columnDefinition = "bigint", nullable = false)
    private Long id;

    @Column(name = "content", columnDefinition = "varchar(200)", nullable = false)
    private String content;

    @Column(name = "is_deleted", columnDefinition = "tinyint(1) default 0", nullable = false)
    private Boolean isDeleted = false;
}
