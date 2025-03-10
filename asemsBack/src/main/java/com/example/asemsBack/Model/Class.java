package com.example.asemsBack.Model;

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
public class Class {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String className;

    private String program;

    @OneToMany(mappedBy = "classes", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private Set<CourseClass> courseCourses = new HashSet<>();

    @ManyToOne
    @JoinColumn(name = "department_id", nullable = false)
    @JsonIgnore
    private Department departments;

    @OneToMany(mappedBy = "classes", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private Set<Student> students = new HashSet<>();

}
