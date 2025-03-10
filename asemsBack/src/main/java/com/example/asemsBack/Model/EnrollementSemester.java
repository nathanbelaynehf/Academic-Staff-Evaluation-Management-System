package com.example.asemsBack.Model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class EnrollementSemester {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToOne
    @JoinColumn(name = "enrollement_id", nullable = true)
    @JsonIgnore
    private Enrollement enrollement;

    @ManyToOne
    @JoinColumn(name = "semester_id", nullable = true)
    @JsonIgnore
    private Semester semester;

}
