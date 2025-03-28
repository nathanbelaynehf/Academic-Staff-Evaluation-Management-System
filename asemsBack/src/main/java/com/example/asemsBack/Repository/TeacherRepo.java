package com.example.asemsBack.Repository;

import com.example.asemsBack.Dto.StudentDTO;
import com.example.asemsBack.Dto.TeacherDto;
import com.example.asemsBack.Model.Teacher;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TeacherRepo extends JpaRepository<Teacher, Long> {

    @Query("SELECT t FROM Teacher t LEFT JOIN FETCH t.departmentTeachers")
    List<Teacher> findAllWithDepartments();

    @Query(value = "SELECT * FROM teacher WHERE id = :id", nativeQuery = true)
    Teacher findTeacherById(@Param("id") Long id);
//    @Query(value = "SELECT t.id, t.qualification, t.years_of_experience " +
//            "FROM teacher t " +
//            "WHERE t.id = :id", nativeQuery = true)
    Teacher findTeacherById(@Param("id") long id);


    @Query("SELECT new com.example.asemsBack.Dto.TeacherDto(t.id, t.user.username, t.user.fname, t.user.lname) " +
            "FROM Teacher t LEFT JOIN t.user")
    List<TeacherDto> findAllWithUserDTO();

    Teacher findByUserUsername(String username);

    @Query("SELECT new com.example.asemsBack.Dto.TeacherDto(t.id, t.user.username, t.user.fname, t.user.lname) " +
            "FROM Teacher t " +
            "WHERE LOWER(t.user.username) LIKE LOWER(CONCAT('%', :username, '%'))")
    List<TeacherDto> findByUserUsernameContaining(@Param("username") String username);

    @Query("SELECT DISTINCT t FROM Teacher t LEFT JOIN FETCH t.departmentTeachers dt LEFT JOIN FETCH dt.dept")
    List<Teacher> findAllTeachersWithDepartments();
}
