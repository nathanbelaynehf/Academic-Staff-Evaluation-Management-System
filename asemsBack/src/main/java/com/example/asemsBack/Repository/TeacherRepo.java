package com.example.asemsBack.Repository;

import com.example.asemsBack.Model.Teacher;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TeacherRepo extends JpaRepository<Teacher, Long> {

    @Query(value = "SELECT * FROM teacher WHERE id = :id", nativeQuery = true)
    Teacher findTeacherById(@Param("id") Long id);
//    @Query(value = "SELECT t.id, t.qualification, t.years_of_experience " +
//            "FROM teacher t " +
//            "WHERE t.id = :id", nativeQuery = true)
    Teacher findTeacherById(@Param("id") long id);
    @Query("SELECT t FROM Teacher t LEFT JOIN FETCH t.user")
    List<Teacher> findAllWithUser();

}
