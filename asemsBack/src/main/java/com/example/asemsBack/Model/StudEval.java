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
    @JsonBackReference("criteria-studEval")
    private Criteria studCriteria;

    @OneToOne
    @JoinColumn(name = "eval_id", referencedColumnName = "evalid", unique = true)
    @JsonIgnore // Prevents infinite recursion
    private Evaluation evaluation;

    @OneToMany(mappedBy = "studEval", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<ReportEvaluation> reportEvaluations = new HashSet<>();

    @ManyToOne
    @JoinColumn(name = "student_id", nullable = false)
    private Student student;

    @ManyToOne
    @JoinColumn(name = "teacherCourse_id", nullable = false)
    private TeacherCourse teacherCourse;
}