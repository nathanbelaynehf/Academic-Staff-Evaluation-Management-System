package com.example.asemsBack.Service;

import com.example.asemsBack.Dto.DepartmentDto;
import com.example.asemsBack.Dto.Mapper;
import com.example.asemsBack.Model.Department;
import com.example.asemsBack.Repository.DepartmentRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class DepartmentService {

    @Autowired
    DepartmentRepo departmentRepo;

    public void addDapartment(Department department) {
    departmentRepo.save(department);
    }

    public DepartmentService(DepartmentRepo departmentRepo) {
        this.departmentRepo = departmentRepo;
    }

    public List<DepartmentDto> getAllDepartmentsWithTeachers() {
        List<Department> departments = departmentRepo.findAll();
        return departments.stream()
                .map(Mapper::toDepartmentDto)
                .collect(Collectors.toList());
    }

}
