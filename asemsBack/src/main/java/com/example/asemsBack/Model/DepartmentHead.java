package com.example.asemsBack.Model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.HashSet;
import java.util.Set;

@JsonIdentityInfo(
        generator = ObjectIdGenerators.PropertyGenerator.class,
        property = "id"
)
@Entity
@Getter
@Setter
@ToString(exclude = {"user", "systemAdmin", "department", "deptEvals"})
public class DepartmentHead {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;


    private String qualification;

    private String specialization;

    private int yearsOfExperience;

    @OneToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id", unique = true)
    @JsonIgnore // Prevents infinite recursion
    private Users user;

    @ManyToOne
    @JoinColumn(name = "admin_id", nullable = true)
    @JsonIgnore // Prevents infinite recursion
    private SystemAdmin systemAdmin;

    @OneToOne
    @JoinColumn(name = "department_id", referencedColumnName = "id", unique = true)
    @JsonIgnore
    private Department department;

    @OneToMany(mappedBy = "departmentHead", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore // Prevents infinite recursion
    private Set<DeptEval> deptEvals = new HashSet<>();
}