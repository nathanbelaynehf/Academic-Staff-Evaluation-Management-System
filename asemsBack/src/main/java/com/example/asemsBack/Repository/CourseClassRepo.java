package com.example.asemsBack.Repository;

import com.example.asemsBack.Model.Course;
import com.example.asemsBack.Model.CourseClass;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CourseClassRepo extends JpaRepository<CourseClass,Long> {
    List<CourseClass> findByClassesId(long classid);
}
