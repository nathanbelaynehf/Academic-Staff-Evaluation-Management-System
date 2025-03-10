package com.example.asemsBack.Service;

import com.example.asemsBack.Model.Department;
import com.example.asemsBack.Model.DepartmentHead;
import com.example.asemsBack.Model.Users;
import com.example.asemsBack.Repository.DepartmentRepo;
import com.example.asemsBack.Repository.DeptHeadRepo;
import com.example.asemsBack.Repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DHRegistrationService {

    @Autowired
    DeptHeadRepo deptHeadRepo;

    @Autowired
    private UserRepo userRepository;

    @Autowired
    DepartmentRepo departmentRepo;

    public void registerDepartmentHead(Users user, String qualification, String specialization, int yearsOfExperience,long deptId) {
        Users savedUser = userRepository.save(user);
        DepartmentHead departmentHead=new DepartmentHead();
        departmentHead.setUser(savedUser);

        Department department=departmentRepo.findById(deptId)
                .orElseThrow(() -> new RuntimeException("Department not found with ID: " + deptId));

        departmentHead.setDepartment(department);
        departmentHead.setQualification(qualification);
        departmentHead.setSpecialization(specialization);
        departmentHead.setYearsOfExperience(yearsOfExperience);
        deptHeadRepo.save(departmentHead);
    }
}
