package com.example.asemsBack.Control.TeacherControls;

import com.example.asemsBack.Model.Semester;
import com.example.asemsBack.Repository.SemesterRepo;
import com.example.asemsBack.Service.ShowStudentResultService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;

@RestController
@RequestMapping("/teach")
@CrossOrigin(origins = "http://localhost:5173")
public class TeachShowEvalResCont {

    @Autowired
    private ShowStudentResultService showStudentResultService;

    @Autowired
    SemesterRepo semesterRepo;

    @GetMapping("/stud/average-score")
    public ResponseEntity<?> getEvaluationResultsForAuthenticatedTeacher() {
        return showStudentResultService.getEvaluationResultsForAuthenticatedTeacher();
    }

    @GetMapping("/round")
    public int getActiveRound() {
        Semester semester = semesterRepo.findByIsActive(true); // Implement this method in your service
        if (semester == null) {
            throw new RuntimeException("Semester not found");
        }

        Date currentDate = new Date(System.currentTimeMillis());

        if (currentDate.after(semester.getStartof1stRoundEval()) && currentDate.before(semester.getStartof2ndRoundEval())) {
            return 1; // First round is active
        } else if (currentDate.after(semester.getStartof2ndRoundEval()) && currentDate.before(semester.getEndDate())) {
            return 2; // Second round is active
        }

        return 0; // No active round
    }
}
