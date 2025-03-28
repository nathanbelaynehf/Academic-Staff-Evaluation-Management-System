package com.example.asemsBack.Model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.HashSet;
import java.util.Set;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class StudEval {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToOne
    @JoinColumn(name = "criteria_id", nullable = false)
    @JsonIgnore
    private Criteria studCriteria;

    @OneToOne
    @JoinColumn(name = "eval_id", referencedColumnName = "evalid", unique = true)
    @JsonIgnore // Prevents infinite recursion
    private Evaluation evaluation;


    @ManyToOne
    @JoinColumn(name = "student_id", nullable = false)
    @JsonIgnore
    private Student student;

    @ManyToOne
    @JoinColumn(name = "teacherCourse_id", nullable = false)
    @JsonIgnore
    private TeacherCourse teacherCourse;
}