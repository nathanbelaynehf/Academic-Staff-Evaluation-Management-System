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
import java.util.Date;
import java.util.List;

@Service
public class DeptEvalService {
    @Autowired
    private CriteriaRepo criteriaRepo;

    @Autowired
    private StudEvalRepository studEvalRepository;

    @Autowired
    private DeptEvalRepo deptEvalRepo;

    @Autowired
    private DeptHeadRepo deptHeadRepo;

    @Autowired
    private EvaluationRepository evalrepo;

    @Autowired
    private TeacherRepo teacherRepo;

    @Autowired
    DepartmentHeadService departmentHeadService;

    @Autowired
    SemesterRepo semesterRepo;

    public List<Criteria> getDepartmentCriteria() {
        // Fetch the active semester
        Semester activeSemester = semesterRepo.findByIsActive(true);

        // Determine the active round
        int activeRound = getActiveRound(activeSemester);

        if (activeRound == 0) {
            throw new IllegalStateException("No active evaluation round for Student.");
        }

        // Fetch criteria for Student and the active round
        return criteriaRepo.findByTypeAndRound("DH", activeRound);
    }

    public int getActiveRound(Semester semester) {
        Date currentDate = new Date(System.currentTimeMillis());

        // Check if the current date is within the first round (inclusive)
        if (!currentDate.before(semester.getStartof1stRoundEval()) && !currentDate.after(semester.getStartof2ndRoundEval())) {
            return 1; // First round is active
        }

        // Check if the current date is within the second round (inclusive)
        if (!currentDate.before(semester.getStartof2ndRoundEval()) && !currentDate.after(semester.getEndDate())) {
            return 2; // Second round is active
        }

        return 0; // No active round
    }


    @Transactional
    public ResponseEntity<?> submitEvaluations(List<EvaluationSubmissionDTO> evaluationRequests, String username) {
        // Fetch the DepartmentHead entity by username
        DepartmentHead departmentHead = departmentHeadService.getDepartmentHeadByUsername(username);

        if (departmentHead == null || departmentHead.getDepartment() == null) {
            return ResponseEntity.badRequest().body("Invalid department head: " + username);
        }

        long deptId = departmentHead.getDepartment().getId();




        for (EvaluationSubmissionDTO evalReq : evaluationRequests) {
            try {
                BigDecimal score = evalReq.getScore();
                long criteriaId = evalReq.getId();
                String remark = evalReq.getRemark();
                long teacherId= evalReq.getTeacherId();
                Teacher teacher = teacherRepo.findTeacherById(teacherId);

                // Fetch Criteria
                Criteria criteria = criteriaRepo.findCriteriaById(criteriaId);
                if (criteria == null) {
                    return ResponseEntity.badRequest().body("Invalid criteria ID: " + criteriaId);
                }

                // Create and Save DeptEval
                DeptEval deptEval = new DeptEval();
                deptEval.setDeptCriteria(criteria);
                deptEval.setDepartmentHead(departmentHead);
                deptEval.setTeacher(teacher);
                deptEval = deptEvalRepo.save(deptEval);

                Semester semester=getActiveSemester();

                // Create and Save Evaluation
                Evaluation evaluation = new Evaluation();
                evaluation.setScore(score);
                evaluation.setSemester(semester);
                evaluation.setRemark(remark);
                deptEval.setEvaluation(evaluation);
                evalrepo.save(evaluation);

            } catch (Exception e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                        .body("Error processing evaluation: " + e.getMessage());
            }
        }
        return ResponseEntity.ok("Evaluations submitted successfully!");
    }

    public Semester getActiveSemester() {
        return semesterRepo.findByIsActive(true);

    }



}
