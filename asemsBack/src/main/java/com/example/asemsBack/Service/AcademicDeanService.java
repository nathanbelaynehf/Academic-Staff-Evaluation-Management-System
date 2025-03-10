package com.example.asemsBack.Service;

import com.example.asemsBack.Control.AcademicDeanEvalDTO;
import com.example.asemsBack.Model.*;
import com.example.asemsBack.Repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class AcademicDeanService {

    @Autowired
    private UserRepo usersRepository;

    @Autowired
    ADRepo adRepo;

    @Autowired
    private UserRepo userRepository;

    @Autowired
    EvaluationRepository evaluationRepository;

    @Autowired
    AdEvalRepo adEvalRepo;

    @Autowired
    TeacherRepo teacherRepo;

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
        Users savedUser = userRepository.save(user);
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
        adEvalRepo.save(academicDeanEval);

        Evaluation evaluation = new Evaluation();
        evaluation.setRemark(remark);
        evaluation.setScore(score);

        academicDeanEval.setEvaluation(evaluation);


        return evaluationRepository.save(evaluation);
    }

}
