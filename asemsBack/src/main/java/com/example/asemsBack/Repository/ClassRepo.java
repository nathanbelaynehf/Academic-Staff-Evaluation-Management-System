package com.example.asemsBack.Repository;

import com.example.asemsBack.Model.Class;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ClassRepo extends JpaRepository<Class,Long> {
    public List<Class> findByDepartments_Id(long departmentId);



}
