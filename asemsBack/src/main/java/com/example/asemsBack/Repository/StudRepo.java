package com.example.asemsBack.Repository;

import com.example.asemsBack.Dto.StudentDTO;
import com.example.asemsBack.Model.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StudRepo  extends JpaRepository<Student,Long> {
    @Query("SELECT new com.example.asemsBack.Dto.StudentDTO(s.id, s.user.username, s.user.fname, s.user.lname) " +
            "FROM Student s " +
            "WHERE LOWER(s.user.username) LIKE LOWER(CONCAT('%', :username, '%'))")
    List<StudentDTO> findByUserUsernameContaining(@Param("username") String username);
}
