package com.example.asemsBack.Model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

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

    @Column(name = "score", precision = 5, scale = 2) // DECIMAL(5,2)
    private BigDecimal score;

    @Lob
    @Column(length = 10000) // Adjust length based on your needs
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

    @OneToOne(mappedBy = "evaluation")
    @JsonIgnore
    private StudReportEval studReportEval;


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