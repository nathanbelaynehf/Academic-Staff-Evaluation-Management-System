package com.example.asemsBack.Model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
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
public class Student {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private int batchYear;

    @OneToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id", unique = true)
    @JsonBackReference(value = "user-student")
    private Users user;

    @ManyToOne
    @JoinColumn(name = "registerar_id", nullable = true)
    private Registrar registrar;

    @ManyToOne
    @JoinColumn(name = "admin_id", nullable = true)
    private SystemAdmin systemAdmin;

    @OneToMany(mappedBy = "student", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Enrollement> enrollements = new HashSet<>();

    @OneToMany(mappedBy = "student", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<StudEval> studEvals = new HashSet<>();

    @ManyToOne
    @JoinColumn(name = "class_id", nullable = false)
    @JsonIgnore
    private Class classes;

}