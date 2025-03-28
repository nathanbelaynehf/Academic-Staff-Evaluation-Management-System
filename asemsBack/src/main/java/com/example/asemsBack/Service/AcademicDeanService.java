package com.example.asemsBack.Service;

import com.example.asemsBack.Dto.AcademicDeanEvalDTO;
import com.example.asemsBack.Model.*;
import com.example.asemsBack.Repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.Collections;
import java.util.Date;
import java.util.List;
import java.util.Map;

@Service
public class AcademicDeanService {

    @Autowired
    private UserRepo usersRepository;

    @Autowired
    ADRepo adRepo;


    @Autowired
    EvaluationRepository evaluationRepository;

    @Autowired
    AdEvalRepo adEvalRepo;

    @Autowired
    TeacherRepo teacherRepo;

    @Autowired
    SemesterRepo semesterRepo;

    public List<AcademicDeanEvalDTO> getAcademicDeanEvaluationsByTeacherId(Long teacherId) {
        List<AcademicDeanEvalDTO> evaluations = adEvalRepo.findScoreAndRemarkByTeacherId(teacherId);
        return evaluations;
    }

//    private AcademicDeanEvalDTO convertToDTO(AcademicDeanEval academicDeanEval) {
//        AcademicDeanEvalDTO dto = new AcademicDeanEvalDTO();
//        dto.setScore(academicDeanEval.getEvaluation().getScore());
//        dto.setRemark(academicDeanEval.getEvaluation().getRemark());
//        return dto;
//    }


    public void registerAcademicDean(Users user, String highestDegree, String academicRank) {
        Users savedUser = usersRepository.save(user);
        AcademicDean academicDean=new AcademicDean();
        academicDean.setUser(savedUser);
        academicDean.setHighestDegree(highestDegree);
        academicDean.setAcademicRank(academicRank);
        adRepo.save(academicDean);
    }
    public AcademicDean getAcademicDeanByUsername(String username) {
        // Find the AcademicDean by username. You can adjust this method to suit your needs.
        Users user = usersRepository.findByUsername(username);

        if (user != null && user.getAcademicDean() != null) {
            return user.getAcademicDean();  // Return the DepartmentHead associated with the user
        }

        return null;
    }

//    public Evaluation saveEvaluations(Evaluation evaluations) {
//        return evaluationRepository.save(evaluations);
//    }

    public Evaluation saveEvaluations(String username, Map<String, Object> request) throws Exception {
        long teacherId = ((Number) request.get("teacherId")).longValue();  // Ensure it's a Long
        int score = ((Number) request.get("score")).intValue();  // Ensure it's an int
        String remark = (String) request.get("remark");  // Directly cast as String

        Teacher teacher = teacherRepo.findById(teacherId)
                .orElseThrow(() -> new Exception("Teacher not found with id: " + teacherId));

        AcademicDean academicDean = getAcademicDeanByUsername(username);
        AcademicDeanEval academicDeanEval = new AcademicDeanEval();
        academicDeanEval.setAcademicDean(academicDean);
        academicDeanEval.setTeacher(teacher);
        Semester activeSemester = semesterRepo.findByIsActive(true);

        int activeRound = getActiveRound(activeSemester);
        academicDeanEval.setRound(activeRound);
        adEvalRepo.save(academicDeanEval);

        Evaluation evaluation = new Evaluation();
        evaluation.setRemark(remark);
        evaluation.setScore(BigDecimal.valueOf(score));
        evaluation.setSemester(activeSemester);
        academicDeanEval.setEvaluation(evaluation);

        return evaluationRepository.save(evaluation);
    }

    private int getActiveRound(Semester semester) {
        Date currentDate = new Date(System.currentTimeMillis());

        if (currentDate.after(semester.getStartof1stRoundEval()) && currentDate.before(semester.getEndof1stRoundEval())) {
            return 1; // First round is active
        } else if (currentDate.after(semester.getStartof2ndRoundEval()) && currentDate.before(semester.getEndof2ndRoundEval())) {
            return 2; // Second round is active
        } else {
            return 0; // No active round
        }
    }

}
