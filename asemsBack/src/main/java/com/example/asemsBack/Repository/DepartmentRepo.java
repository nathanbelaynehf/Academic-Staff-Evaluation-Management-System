package com.example.asemsBack.Repository;

import com.example.asemsBack.Model.Department;
import com.example.asemsBack.Model.Teacher;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DepartmentRepo extends JpaRepository<Department,Long> {
    // DepartmentRepository.java (add these methods)
    @Query("SELECT DISTINCT dt.dept FROM DepartmentTeacher dt")
    List<Department> findAllDepartmentsWithTeachers();

    @Query("SELECT t FROM Teacher t JOIN DepartmentTeacher dt ON t.id = dt.teacher.id WHERE dt.dept.id = :deptId")
    List<Teacher> findTeachersByDepartmentId(Long deptId);
}