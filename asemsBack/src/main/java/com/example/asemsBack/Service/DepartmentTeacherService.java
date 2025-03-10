package com.example.asemsBack.Service;

import com.example.asemsBack.Model.Department;
import com.example.asemsBack.Model.DepartmentTeacher;
import com.example.asemsBack.Model.Teacher;
import com.example.asemsBack.Repository.DepartmentRepo;
import com.example.asemsBack.Repository.DeptTeachRepo;
import com.example.asemsBack.Repository.TeacherRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class DepartmentTeacherService {

    @Autowired
    DepartmentRepo departmentRepo;

    @Autowired
    TeacherRepo teacherRepo;

    @Autowired
    DeptTeachRepo deptTeachRepo;

    public void associateTeacherWithDepartment(Map<String, Long> request) throws Exception {
        Long departmentId = request.get("departmentId");
        Long teacherId = request.get("teacherId");

        if (departmentId == null || teacherId == null) {
            throw new Exception("Invalid request: departmentId and teacherId are required.");
        }

        // Fetch the department and teacher entities
        Department department = departmentRepo.findById(departmentId)
                .orElseThrow(() -> new Exception("Department not found with id: " + departmentId));

        Teacher teacher = teacherRepo.findById(teacherId)
                .orElseThrow(() -> new Exception("Teacher not found with id: " + teacherId));


        // Create a new DepartmentTeacher entity
        DepartmentTeacher departmentTeacher = new DepartmentTeacher();
        departmentTeacher.setDept(department);
        departmentTeacher.setTeacher(teacher);

        // Save the association
        deptTeachRepo.save(departmentTeacher);
    }
}