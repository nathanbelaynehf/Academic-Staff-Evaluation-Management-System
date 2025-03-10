package com.example.asemsBack.Model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ReportEvaluation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToOne
    @JoinColumn(name = "report_id", nullable = false)
    private Report report;

    @ManyToOne
    @JoinColumn(name = "studEval_id", nullable = false)
    private StudEval studEval;
}
