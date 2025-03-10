package com.example.asemsBack.Model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;
import lombok.*;

import java.util.HashSet;
import java.util.Set;

@JsonIdentityInfo(
        generator = ObjectIdGenerators.PropertyGenerator.class,
        property = "id"
)
@Entity
@Getter
@Setter
public class TeacherCourse {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;


    @ManyToOne
    @JoinColumn(name = "teacher_id", nullable = false)
    @JsonIgnore
    private Teacher teacher;

    @ManyToOne
    @JoinColumn(name = "course_id", nullable = false)
    @JsonIgnore
    private Course course;

    @OneToMany(mappedBy = "teacherCourse", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private Set<StudEval> studEvals = new HashSet<>();

    @OneToMany(mappedBy = "teacherCourse", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private Set<Report> reports = new HashSet<>();

    @OneToMany(mappedBy = "teacherCourse", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private Set<CourseClass> courseCourses = new HashSet<>();



    @OneToMany(mappedBy = "teacherCourse", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private Set<Enrollement> enrollements = new HashSet<>();

    @OneToMany(mappedBy = "teacherCourse", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private Set<SemesterTeacherCourse> semesterTeacherCourses = new HashSet<>();
}
