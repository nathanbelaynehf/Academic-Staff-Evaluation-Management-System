package com.example.asemsBack.Model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@JsonIdentityInfo(
        generator = ObjectIdGenerators.PropertyGenerator.class,
        property = "evalid"
)
@Entity
@Getter
@Setter
public class Evaluation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long evalid;

    private int score;
    private String remark;


    @OneToOne(mappedBy = "evaluation")
    @JsonIgnore
    private AcademicDeanEval academicDeanEval;

    @OneToOne(mappedBy = "evaluation")
    @JsonIgnore
    private DeptEval deptEval;

    @OneToOne(mappedBy = "evaluation")
    @JsonIgnore
    private StudEval studEval;


    @ManyToOne
    @JoinColumn(name = "semester_id", nullable = true)
    @JsonIgnore // Prevents infinite recursion
    private Semester semester;

    @Override
    public String toString() {
        return "Evaluation{" +
                "evalid=" + evalid +
                ", score=" + score +
                ", remark='" + remark+
                '}';
    }
}