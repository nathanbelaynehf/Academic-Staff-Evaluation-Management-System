package com.example.asemsBack.Service;

import com.example.asemsBack.Model.Class;
import com.example.asemsBack.Model.Department;
import com.example.asemsBack.Repository.ClassRepo;
import com.example.asemsBack.Repository.DepartmentRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@
    Service
    public class ClassService {

        @Autowired
        ClassRepo classRepo;

        @Autowired
        DepartmentRepo departmentRepo;

    public Class saveClass(Class classes, long departmentId) {
        Department department = departmentRepo.findById(departmentId)
                .orElseThrow(() -> new RuntimeException("Department not found with ID: " + departmentId));

        classes.setDepartments(department); // Set the department before saving
        return classRepo.save(classes);
    }

        public List<Class> showclasses() {
        return  classRepo.findAll();
        }
    public List<Class> getClassesByDepartmentId(long departmentId) {
        // Assuming you have a repository for Class entity
        return classRepo.findByDepartments_Id(departmentId);
    }



}
