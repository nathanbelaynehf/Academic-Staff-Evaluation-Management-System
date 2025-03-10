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
public class Semester {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    public String semesterName;

    public Date startDate;

    public Date startof1stRoundEval;

    public Date endof1stRoundEval;

    public Date startof2ndRoundEval;

    public Date endof2ndRoundEval;

    public Date endDate;

    public Boolean isActive;


    @OneToMany(mappedBy = "semester", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore // Prevents infinite recursion
    private Set<EnrollementSemester> enrollementSemesters = new HashSet<>();


    @OneToMany(mappedBy = "semester", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Evaluation> evaluations = new HashSet<>();

    @OneToMany(mappedBy = "semester", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private Set<SemesterTeacherCourse> semesterTeacherCourses = new HashSet<>();
}
