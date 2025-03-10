package com.example.asemsBack.Model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;
import lombok.*;

import java.util.HashSet;
import java.util.Set;

@JsonIdentityInfo(
        generator = ObjectIdGenerators.PropertyGenerator.class,
        property = "evalid"
)
@Entity
@Getter
@Setter
public class AcademicDean {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String highestDegree;

    private String academicRank;

    @OneToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id", unique = true)
    @JsonBackReference(value = "user-academicDean")
    private Users user;

    @OneToOne
    @JoinColumn(name = "admin_id", referencedColumnName = "id", unique = true)
    private SystemAdmin systemAdmin;

    @OneToMany(mappedBy = "academicDean", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore // Prevents infinite recursion
    private Set<AcademicDeanEval> academicDeanEvals = new HashSet<>();
}
