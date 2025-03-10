package com.example.asemsBack.Repository;

import com.example.asemsBack.Model.SemesterTeacherCourse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SemesTeachCourseRepo extends JpaRepository<SemesterTeacherCourse,Long> {

}
