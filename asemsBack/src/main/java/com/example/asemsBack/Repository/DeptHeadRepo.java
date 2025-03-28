package com.example.asemsBack.Repository;

import com.example.asemsBack.Dto.DepartmentHeadDto;
import com.example.asemsBack.Model.DepartmentHead;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DeptHeadRepo extends JpaRepository<DepartmentHead, Long> {

    @Query(value = "SELECT * FROM department_head WHERE id = :id", nativeQuery = true)
    DepartmentHead findDeptHeadById(@Param("id") Long id);

    @Query("SELECT new com.example.asemsBack.Dto.DepartmentHeadDto(dh.id, dh.user.fname,  dh.user.lname, dh.user.username, dh.department.departmentName) " +
            "FROM DepartmentHead dh LEFT JOIN dh.user LEFT JOIN dh.department")
    List<DepartmentHeadDto> findAllWithUserAndDepartmentDTO();

    @Query("SELECT new com.example.asemsBack.Dto.DepartmentHeadDto(dh.id, dh.user.fname, dh.user.lname, dh.user.username, dh.department.departmentName) " +
            "FROM DepartmentHead dh " +
            "WHERE LOWER(dh.user.username) LIKE LOWER(CONCAT('%', :username, '%'))")
    List<DepartmentHeadDto> findByUserUsernameContaining(@Param("username") String username);
}
