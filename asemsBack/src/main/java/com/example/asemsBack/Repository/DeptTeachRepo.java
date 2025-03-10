package com.example.asemsBack.Repository;

import com.example.asemsBack.Model.DepartmentTeacher;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DeptTeachRepo extends JpaRepository<DepartmentTeacher,Long> {
    List<DepartmentTeacher> findByDeptId(Long deptId);
}
