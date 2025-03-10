package com.example.asemsBack.Model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;
import lombok.*;

@JsonIdentityInfo(
        generator = ObjectIdGenerators.PropertyGenerator.class,
        property = "evalid"
)
@Entity
@Getter
@Setter
public class AcademicDeanEval {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @OneToOne
    @JoinColumn(name = "eval_id", referencedColumnName = "evalid", unique = true)
    @JsonIgnore // Prevents infinite recursion
    private Evaluation evaluation;


    @ManyToOne
    @JoinColumn(name = "teacher_id", nullable = false)
    @JsonIgnore
    private Teacher teacher;

    @ManyToOne
    @JoinColumn(name = "academicDean_id", nullable = false)
    @JsonIgnore
    private AcademicDean academicDean;
}
