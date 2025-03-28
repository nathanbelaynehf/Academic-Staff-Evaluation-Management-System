package com.example.asemsBack.Model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
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
    @JsonIgnore
    private Users user;

    @OneToOne(mappedBy = "systemAdmin", cascade = CascadeType.ALL)
    @JsonIgnore
    private Registrar registrar;

    @OneToMany(mappedBy = "systemAdmin", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private Set<Teacher> teachers = new HashSet<>();

    @OneToMany(mappedBy = "systemAdmin", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private Set<Student> students = new HashSet<>();

    @OneToMany(mappedBy = "systemAdmin", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private Set<DepartmentHead> departmentHeads = new HashSet<>();

    @OneToOne(mappedBy = "systemAdmin", cascade = CascadeType.ALL)
    @JsonIgnore
    private AcademicDean academicDean;

}