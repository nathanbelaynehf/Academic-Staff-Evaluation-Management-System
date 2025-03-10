package com.example.asemsBack.Control;

import com.example.asemsBack.Model.DepartmentHead;
import com.example.asemsBack.Model.DepartmentTeacher;
import com.example.asemsBack.Service.DepartmentHeadService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/dh")
public class DepartmentHeadController {

    @Autowired
    private DepartmentHeadService departmentHeadService;

    @GetMapping("/getDepartmentHead")
    public DepartmentHead getDepartmentHead() {
        // Get authenticated user
        String username = getAuthenticatedUsername();

        // Call the service to get the DepartmentHead
        return departmentHeadService.getDepartmentHeadByUsername(username);
    }

    @GetMapping("/Instructor")
    public List<TeacherDto> getTeachers() {
        // Get authenticated user
        String username = getAuthenticatedUsername();

        // Fetch department head
        DepartmentHead departmentHead = departmentHeadService.getDepartmentHeadByUsername(username);

        if (departmentHead != null && departmentHead.getDepartment() != null) {
            // Fetch teachers based on departmentId
            List<DepartmentTeacher> departmentTeachers = departmentHeadService.getTeachersByDepartment(departmentHead.getDepartment().getId());

            // Convert DepartmentTeacher entities to TeacherDTO (including username and ID)
            return departmentTeachers.stream()
                    .map(dt -> new TeacherDto(
                            dt.getTeacher().getId(),       // Teacher ID
                            dt.getTeacher().getUsername()  // Teacher Username
                    ))
                    .collect(Collectors.toList());
        }

        return null;
    }

    private String getAuthenticatedUsername() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null || !authentication.isAuthenticated()) {
            throw new RuntimeException("User not authenticated");
        }

        return ((UserDetails) authentication.getPrincipal()).getUsername();
    }
}
