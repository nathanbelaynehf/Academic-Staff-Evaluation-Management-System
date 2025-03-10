package com.example.asemsBack.Model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;
import java.util.HashSet;
import java.util.Set;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Enrollement {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private Date enrollementDate;

    @ManyToOne
    @JoinColumn(name = "teacher_course_id", nullable = true)
    @JsonIgnore
    private TeacherCourse teacherCourse;

    @ManyToOne
    @JoinColumn(name = "student_id", nullable = false)
    @JsonIgnore
    private Student student;

    @OneToMany(mappedBy = "enrollement", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore // Prevents infinite recursion
    private Set<EnrollementSemester> enrollementSemesters = new HashSet<>();
}