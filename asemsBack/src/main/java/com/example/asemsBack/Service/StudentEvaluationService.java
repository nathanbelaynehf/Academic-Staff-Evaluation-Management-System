package com.example.asemsBack.Service;

import com.example.asemsBack.Dto.EvaluationSubmissionDTO;
import com.example.asemsBack.Model.*;
import com.example.asemsBack.Repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.*;

@Service
public class StudentEvaluationService {

    @Autowired
    StudEvalRepository studEvalRepository;

    @Autowired
    UserRepo usersRepository;

    @Autowired
    TeacherCourseRepo teacherCourseRepo;

    @Autowired
    EvaluationRepository evaluationRepository;

    @Autowired
    private CriteriaRepo criteriaRepo;

    @Autowired
    SemesterRepo semesterRepo;


    public List<Criteria> getStudentCriteria() {
        // Fetch the active semester
        Semester activeSemester = semesterRepo.findByIsActive(true);

        // Determine the active round
        int activeRound = getActiveRound(activeSemester);

        if (activeRound == 0) {
            throw new IllegalStateException("No active evaluation round for Student.");
        }

        // Fetch criteria for Student and the active round
        return criteriaRepo.findByTypeAndRound("Stud", activeRound);
    }

    public int getActiveRound(Semester semester) {
        Date currentDate = new Date(System.currentTimeMillis());

        if (currentDate.after(semester.getStartof1stRoundEval()) && currentDate.before(semester.getEndof1stRoundEval())) {
            return 1; // First round is active
        } else if (currentDate.after(semester.getStartof2ndRoundEval()) && currentDate.before(semester.getEndof2ndRoundEval())) {
            return 2; // Second round is active
        }

        return 0; // No active round
    }


    @Transactional
    public ResponseEntity<?> submitEvaluations(List<EvaluationSubmissionDTO> evaluationRequests, String username) {
        Student student = getStudentByUsername(username);
        System.out.println("Received evaluations: " + evaluationRequests.size());

        List<String> errors = new ArrayList<>();

        for (EvaluationSubmissionDTO evalReq : evaluationRequests) {
            try {
                System.out.println("Processing evaluation: " + evalReq);

                // Validate data
//                if (evalReq.getScore() == null || evalReq.getId() == null || evalReq.getRemark() == null || evalReq.getTeacherId() == null) {
//                    errors.add("Invalid data for evaluation: " + evalReq);
//                    continue;
//                }

                BigDecimal score = evalReq.getScore();
                long criteriaId = evalReq.getId();
                String remark = evalReq.getRemark();
                long teacherCourseId = evalReq.getTeacherId();

                System.out.println("Score: " + score);
                System.out.println("Criteria ID: " + criteriaId);
                System.out.println("Remark: " + remark);
                System.out.println("Teacher Course ID: " + teacherCourseId);

                // Fetch TeacherCourse
                TeacherCourse teacher = teacherCourseRepo.findById(teacherCourseId)
                        .orElseThrow(() -> new RuntimeException("Teacher Course not found with ID: " + teacherCourseId));

                // Fetch Criteria
                Criteria criteria = criteriaRepo.findCriteriaById(criteriaId);
                if (criteria == null) {
                    errors.add("Invalid criteria ID: " + criteriaId);
                    continue;
                }

                // Create and Save StudEval
                StudEval studEval = new StudEval();
                studEval.setStudCriteria(criteria);
                studEval.setStudent(student);
                studEval.setTeacherCourse(teacher);
                studEval = studEvalRepository.save(studEval);

                // Create and Save Evaluation
                Evaluation evaluation = new Evaluation();
                evaluation.setScore(score);
                evaluation.setSemester(getActiveSemester());
                evaluation.setRemark(remark);
                studEval.setEvaluation(evaluation);
                evaluationRepository.save(evaluation);

                System.out.println("Saved evaluation: " + evaluation);
            } catch (Exception e) {
                System.err.println("Error processing evaluation: " + e.getMessage());
                e.printStackTrace();
                errors.add("Error processing evaluation: " + e.getMessage());
            }
        }

        if (!errors.isEmpty()) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Some evaluations failed: " + String.join(", ", errors));
        }

        return ResponseEntity.ok("Evaluations submitted successfully!");
    }
    public Student getStudentByUsername(String username) {
        Users user = usersRepository.findByUsername(username);

        if (user != null && user.getStudent() != null) {
            return user.getStudent();
        }

        return null;
    }

    public Semester getActiveSemester() {
        return semesterRepo.findByIsActive(true);
    }
}