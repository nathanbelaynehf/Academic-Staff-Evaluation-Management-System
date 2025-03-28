package com.example.asemsBack.Repository;

import com.example.asemsBack.Model.DepartmentCourse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DeptCourseRepo extends JpaRepository<DepartmentCourse,Long> {
    public List<DepartmentCourse> findByDepartmentId(long departmentId);

    DepartmentCourse findByCourseId(Long id);
}
