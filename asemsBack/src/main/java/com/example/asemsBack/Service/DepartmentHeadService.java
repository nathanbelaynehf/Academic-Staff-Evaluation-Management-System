package com.example.asemsBack.Service;

import com.example.asemsBack.Dto.DeptEvalDTO;
import com.example.asemsBack.Dto.DeptEvalResultDTO;
import com.example.asemsBack.Model.*;
import com.example.asemsBack.Repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class DepartmentHeadService {

    @Autowired
    TeacherRepo teacherRepo;

    @Autowired
    private UserRepo usersRepository;

    @Autowired
    private DeptTeachRepo departmentTeacherRepository;

    @Autowired
    private DeptHeadRepo departmentHeadRepository;

    @Autowired
    DeptEvalRepo deptEvalRepo;

    @Autowired
    DeptTeachRepo deptTeachRepo;

    public List<DepartmentTeacher> getTeachersByDepartment(Long departmentId) {
        return departmentTeacherRepository.findByDeptId(departmentId);
    }

    // Fetch DepartmentHead by username (the authenticated user)
    public DepartmentHead getDepartmentHeadByUsername(String username) {
        Users user = usersRepository.findByUsername(username);

        if (user != null && user.getDepartmentHead() != null) {
            return user.getDepartmentHead();
        }

        return null;
    }




    public Map<String, BigDecimal> getSingleTeacherEvaluation(String username, Long teacherId) {
        // 1. Get authenticated department head
        DepartmentHead deptHead = getDepartmentHeadByUsername(username);
        Long headDepartmentId = deptHead.getDepartment().getId();



        // 3. Get evaluations using optimized DTO query
        List<DeptEvalResultDTO> evaluations = deptEvalRepo.findEvaluationsByHeadAndTeacher(
                deptHead.getId(), teacherId);

        // 4. Transform to criteria-score map
        Map<String, BigDecimal> result = new HashMap<>();
        for (DeptEvalResultDTO dto : evaluations) {
            result.put(dto.getCriteriaName(), dto.getScore());
        }

        return result;
    }

}