package com.example.asemsBack.Repository;

import com.example.asemsBack.Model.DepartmentTeacher;
import com.example.asemsBack.Model.DeptEval;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DeptTeachRepo extends JpaRepository<DepartmentTeacher,Long> {
    List<DepartmentTeacher> findByDeptId(Long deptId);

    // In DepartmentTeacherRepo.java
    @Query("SELECT COUNT(dt) > 0 FROM DepartmentTeacher dt " +
            "WHERE dt.dept.id = :departmentId AND dt.teacher.id = :teacherId")
    boolean existsByDeptIdAndTeacherId(
            @Param("departmentId") Long departmentId,
            @Param("teacherId") Long teacherId);

    // In DeptEvalRepo.java
//    List<DeptEval> findByDepartmentHeadAndTeacher(
//            Long departmentHeadId, Long teacherId);
}
