package com.example.asemsBack.Model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.HashSet;
import java.util.Set;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Registrar {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String qualification;

    private int yearsOfExperience;

    @OneToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id", unique = true)
    @JsonBackReference(value = "user-registrar")
    private Users user;

    @OneToMany(mappedBy = "registrar", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Teacher> teachers = new HashSet<>();

    @OneToMany(mappedBy = "registrar", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Student> students = new HashSet<>();

    @OneToOne
    @JoinColumn(name = "admin_id", referencedColumnName = "id", unique = true)
    private SystemAdmin systemAdmin;
}
