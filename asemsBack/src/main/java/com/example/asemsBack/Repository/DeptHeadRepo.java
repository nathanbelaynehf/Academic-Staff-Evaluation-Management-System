package com.example.asemsBack.Repository;

import com.example.asemsBack.Model.DepartmentHead;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface DeptHeadRepo extends JpaRepository<DepartmentHead, Long> {

    @Query(value = "SELECT * FROM department_head WHERE id = :id", nativeQuery = true)
    DepartmentHead findDeptHeadById(@Param("id") Long id);
}
