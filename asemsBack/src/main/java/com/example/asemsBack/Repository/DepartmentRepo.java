package com.example.asemsBack.Repository;

import com.example.asemsBack.Dto.ClassDTO;
import com.example.asemsBack.Dto.DepartmentStudentCountDTO;
import com.example.asemsBack.Dto.DepartmentWithClassesDTO;
import com.example.asemsBack.Model.Department;
import com.example.asemsBack.Model.Teacher;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DepartmentRepo extends JpaRepository<Department,Long> {
    // DepartmentRepository.java (add these methods)
    @Query("SELECT DISTINCT dt.dept FROM DepartmentTeacher dt")
    List<Department> findAllDepartmentsWithTeachers();

    @Query("SELECT t FROM Teacher t JOIN DepartmentTeacher dt ON t.id = dt.teacher.id WHERE dt.dept.id = :deptId")
    List<Teacher> findTeachersByDepartmentId(Long deptId);



        @Query("""
        SELECT new com.example.asemsBack.Dto.DepartmentStudentCountDTO(
            d.id,
            d.departmentName,
            COUNT(s.id)) 
        FROM Department d
        LEFT JOIN d.classes c
        LEFT JOIN c.students s
        GROUP BY d.id, d.departmentName
        """)
        List<DepartmentStudentCountDTO> findAllDepartmentStudentCounts();

    @Query("SELECT d FROM Department d")
    List<Department> findAllDepartments();

    // Query 2: Get class counts for a specific department
    @Query("""
        SELECT new com.example.asemsBack.Dto.ClassDTO(
            c.id,
            c.className,
            COUNT(s.id),
            c.program
        )
        FROM Class c
        LEFT JOIN c.students s
        WHERE c.departments.id = :departmentId
        GROUP BY c.id, c.className,c.program
        """)
    List<ClassDTO> findClassCountsByDepartmentId(@Param("departmentId") Long departmentId);

}