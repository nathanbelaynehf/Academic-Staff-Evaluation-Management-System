package com.example.asemsBack.Service;

import com.example.asemsBack.Control.EvaluationSubmissionDTO;
import com.example.asemsBack.Model.*;
import com.example.asemsBack.Repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

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



    public ResponseEntity<?> submitEvaluations(List<EvaluationSubmissionDTO> evaluationRequests, String username) {
        Student student=getStudentByUsername(username);

        for (EvaluationSubmissionDTO evalReq : evaluationRequests) {
            try {
                int score = evalReq.getScore();
                long criteriaId = evalReq.getId();
                String remark = evalReq.getRemark();
                long teacherCourseId= evalReq.getTeacherId();
                TeacherCourse teacher = teacherCourseRepo.findById(teacherCourseId) .orElseThrow(() -> new RuntimeException("Teacher Course not found with ID: " + teacherCourseId));


                // Fetch Criteria
                Criteria criteria = criteriaRepo.findCriteriaById(criteriaId);
                if (criteria == null) {
                    return ResponseEntity.badRequest().body("Invalid criteria ID: " + criteriaId);
                }

                StudEval studEval=new StudEval();
                studEval.setStudCriteria(criteria);
                studEval.setStudent(student);
                studEval.setTeacherCourse(teacher);
                studEval=studEvalRepository.save(studEval);

                Semester semester=getActiveSemester();

                // Create and Save Evaluation
                Evaluation evaluation = new Evaluation();
                evaluation.setScore(score);
                evaluation.setSemester(semester);
                evaluation.setRemark(remark);
                studEval.setEvaluation(evaluation);
                evaluationRepository.save(evaluation);

            } catch (Exception e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                        .body("Error processing evaluation: " + e.getMessage());
            }
        }
        return ResponseEntity.ok("Evaluations submitted successfully!");
    }

    public Student getStudentByUsername(String username) {
        Users user = usersRepository.findByUsername(username);

        if (user != null && user.getStudent() != null) {
            return user.getStudent();  // Return the DepartmentHead associated with the user
        }

        return null;  // Return null if no department head is found
    }

    public Semester getActiveSemester() {
        return semesterRepo.findByIsActive(true);
    }
}