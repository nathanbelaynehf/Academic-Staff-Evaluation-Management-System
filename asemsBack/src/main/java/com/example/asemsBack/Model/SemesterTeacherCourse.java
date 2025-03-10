package com.example.asemsBack.Model;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;

@JsonIdentityInfo(
        generator = ObjectIdGenerators.PropertyGenerator.class,
        property = "id"
)
@Entity
@Getter
@Setter
public class SemesterTeacherCourse {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToOne
    @JoinColumn(name = "teacher_course_id", nullable = false)
    @JsonIgnore
    private TeacherCourse teacherCourse;

    @ManyToOne
    @JoinColumn(name = "semester_id", nullable = false)
    @JsonIgnore
    private Semester semester;

}
