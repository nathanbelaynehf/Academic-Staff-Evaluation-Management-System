package com.example.asemsBack.Service;


import com.example.asemsBack.Model.DepartmentHead;
import com.example.asemsBack.Model.DepartmentTeacher;
import com.example.asemsBack.Model.Users;
import com.example.asemsBack.Repository.DeptTeachRepo;
import com.example.asemsBack.Repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DepartmentHeadService {

    @Autowired
    private UserRepo usersRepository;

    @Autowired
    private DeptTeachRepo departmentTeacherRepository;


    public List<DepartmentTeacher> getTeachersByDepartment(Long departmentId) {
        return departmentTeacherRepository.findByDeptId(departmentId);
    }

    // Fetch DepartmentHead by username (the authenticated user)
    public DepartmentHead getDepartmentHeadByUsername(String username) {
        Users user = usersRepository.findByUsername(username);

        if (user != null && user.getDepartmentHead() != null) {
            return user.getDepartmentHead();  // Return the DepartmentHead associated with the user
        }

        return null;  // Return null if no department head is found
    }
}

