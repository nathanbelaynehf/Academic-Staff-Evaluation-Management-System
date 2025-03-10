package com.example.asemsBack.Model;

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
public class Report {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String topicCovered;

    private String styleOfTeaching;

    @OneToMany(mappedBy = "report", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<ReportEvaluation> reportEvaluations = new HashSet<>();

    @ManyToOne
    @JoinColumn(name = "teacherCourse_id", nullable = false)
    private TeacherCourse teacherCourse;
}
