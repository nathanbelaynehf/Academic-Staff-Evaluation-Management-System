package com.example.asemsBack.Model;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.sql.Date;

@JsonIdentityInfo(
        generator = ObjectIdGenerators.PropertyGenerator.class,
        property = "id"
)
@Entity
@Getter
@Setter
@ToString(exclude = {"student", "teacher", "academicDean", "departmentHead", "systemAdmin", "registrar"})
public class Users {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String username;

    private String password;

    private String role;

    private Date dob;

    private String sex;

    private boolean status;

    private Date dateOfReg;

    private String Nationality;

    private String city;

    private String subCity;

    private String kebele;

    private int pnum;

    private String email;

    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonIgnore // Prevents infinite recursion
    private Student student;

    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonIgnore // Prevents infinite recursion
    private Teacher teacher;

    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonIgnore // Prevents infinite recursion
    private AcademicDean academicDean;

    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonIgnore // Prevents infinite recursion
    private DepartmentHead departmentHead;

    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonIgnore // Prevents infinite recursion
    private SystemAdmin systemAdmin;

    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonIgnore // Prevents infinite recursion
    private Registrar registrar;
}