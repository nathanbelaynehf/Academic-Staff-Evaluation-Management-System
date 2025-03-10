package com.example.asemsBack.Model;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;
import lombok.*;

@JsonIdentityInfo(
        generator = ObjectIdGenerators.PropertyGenerator.class,
        property = "id"
)
@Entity
@Getter
@Setter
public class CourseClass {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToOne
    @JoinColumn(name = "class_id", nullable = false)
    @JsonIgnore
    private Class classes;

    @ManyToOne
    @JoinColumn(name = "teacher_course_id", nullable = false)
    @JsonIgnore
    private TeacherCourse teacherCourse;
}
