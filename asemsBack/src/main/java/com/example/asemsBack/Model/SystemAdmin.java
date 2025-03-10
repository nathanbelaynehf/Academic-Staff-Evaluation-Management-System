package com.example.asemsBack.Model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
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
public class SystemAdmin {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private Date lastLogin;

    @OneToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id", unique = true)
    @JsonBackReference(value = "user-systemAdmin")
    private Users user;

    @OneToOne(mappedBy = "systemAdmin", cascade = CascadeType.ALL)
    private Registrar registrar;

    @OneToMany(mappedBy = "systemAdmin", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference(value = "teacher-systemAdmin")
    private Set<Teacher> teachers = new HashSet<>();

    @OneToMany(mappedBy = "systemAdmin", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Student> students = new HashSet<>();

    @OneToMany(mappedBy = "systemAdmin", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonBackReference(value = "dh-sysadm")
    private Set<DepartmentHead> departmentHeads = new HashSet<>();

    @OneToOne(mappedBy = "systemAdmin", cascade = CascadeType.ALL)
    private AcademicDean academicDean;

}