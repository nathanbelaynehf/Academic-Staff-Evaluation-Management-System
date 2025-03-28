package com.example.asemsBack.Model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class DeptEval {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToOne
    @JoinColumn(name = "criteria_id", nullable = false)
    @JsonIgnore // ✅ Matches Criteria
    private Criteria deptCriteria;


    @OneToOne
    @JoinColumn(name = "eval_id", referencedColumnName = "evalid", unique = true)
    @JsonIgnore // Prevents infinite recursion
    private Evaluation evaluation;

    @ManyToOne
    @JoinColumn(name = "departmentHead_id", nullable = false)
    @JsonIgnore
    private DepartmentHead departmentHead;

    @ManyToOne
    @JoinColumn(name = "teacher_id", nullable = false)
    @JsonIgnore
    private Teacher teacher;
}
