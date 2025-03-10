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
public class Teacher {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String qualification;

    private String specialization;

    private int yearsOfExperience;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", referencedColumnName = "id", unique = true)
    @JsonIgnore // Prevents infinite recursion
    private Users user;

    @OneToMany(mappedBy = "teacher", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore // Prevents infinite recursion
    private Set<TeacherCourse> teacherCourses = new HashSet<>();

    @OneToMany(mappedBy = "teacher", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore // Prevents infinite recursion
    private Set<DeptEval> deptEvals = new HashSet<>();

    @OneToMany(mappedBy = "teacher", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore // Prevents infinite recursion
    private Set<AcademicDeanEval> academicDeanEvals = new HashSet<>();

    @OneToMany(mappedBy = "teacher", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore // Prevents infinite recursion
    private Set<DepartmentTeacher> departmentTeachers = new HashSet<>();

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "registrar_id", nullable = true)
    @JsonIgnore // Prevents infinite recursion
    private Registrar registrar;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "admin_id", nullable = true)
    @JsonIgnore // Prevents infinite recursion
    private SystemAdmin systemAdmin;

    public String getUsername() {
        return user != null ? user.getUsername() : null;
    }


    @Override
    public String toString() {
        return "Teacher{" +
                "id=" + id +
                ", qualification='" + qualification + '\'' +
                ", specialization='" + specialization + '\'' +
                ", yearsOfExperience=" + yearsOfExperience +
                ", user=" + (user != null ? user.getId() : null) + // Only log user ID
                '}';
    }
}