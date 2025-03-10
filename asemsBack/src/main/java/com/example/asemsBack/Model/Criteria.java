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
public class Criteria {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String name;

    private String type;

    private int round;

    @OneToMany(mappedBy = "deptCriteria", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore // Prevents infinite recursion
    private Set<DeptEval> deptEvals = new HashSet<>();

    @OneToMany(mappedBy = "studCriteria", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore // Prevents infinite recursion
    private Set<StudEval> studEvals = new HashSet<>();

    @Override
    public String toString() {
        return "Criteria{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", type='" + type + '\'' +
                // Exclude bidirectional relationships
                '}';
    }
}