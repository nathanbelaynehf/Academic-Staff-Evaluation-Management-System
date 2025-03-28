package com.example.asemsBack.Service;

import com.example.asemsBack.Dto.StudentDTO;
import com.example.asemsBack.Model.*;
import com.example.asemsBack.Repository.EnrollRepo;
import com.example.asemsBack.Repository.StudRepo;
import com.example.asemsBack.Repository.UserRepo;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class StudentService {
    @Autowired
    private EnrollRepo enrollementRepository;

    @Autowired
    private StudRepo studentRepository;

    @Autowired
    private UserRepo userRepository;

    public List<EnrollmentResponse> getEnrollmentsForAuthenticatedStudent() {
        // Fetch the authenticated student's username
        String username = getAuthenticatedUsername();

        // Fetch the student based on the username (assuming student and user are linked via username)
        Users user = userRepository.findByUsername(username);

        // Find the student's enrollments
        List<Enrollement> enrollments = enrollementRepository.findByStudentIdAndActiveSemester(user.getStudent().getId());

        // Convert Enrollement to custom response with teacher's username and course name
        return enrollments.stream()
                .map(enrollment -> {
                    TeacherCourse teacherCourse = enrollment.getTeacherCourse();
                    Course course = teacherCourse.getCourse();
                    String teacherUsername = teacherCourse.getTeacher().getUser().getUsername();
                    long teacherCourseId= teacherCourse.getId();
                    String fname=teacherCourse.getTeacher().getUser().getFname();
                    String lname=teacherCourse.getTeacher().getUser().getLname();

                    return new EnrollmentResponse(teacherUsername, course.getCourseName(),teacherCourseId,fname,lname);
                })
                .collect(Collectors.toList());
    }

    // Method to fetch the username of the authenticated user
    private String getAuthenticatedUsername() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null || !authentication.isAuthenticated()) {
            throw new RuntimeException("User not authenticated");
        }

        return ((UserDetails) authentication.getPrincipal()).getUsername();
    }

    public List<StudentDTO> getAllStudents() {
        // Fetch all students from the repository
        List<Student> students = studentRepository.findAll();

        // Map the list of students to StudentUsernameDTOs
        return students.stream()
                .map(student -> {
                    // Assuming each Student has a relationship to User
                    String username = student.getUser() != null ? student.getUser().getUsername() : null;
                    long id=student.getId();
                    String fname=student.getUser().getFname();
                    String lname=student.getUser().getLname();
                    return new StudentDTO(id,username,fname,lname);
                })
                .collect(Collectors.toList());
    }
    // DTO to hold teacher's username and course name for the response
    public static class EnrollmentResponse {
        private String teacherUsername;
        private String courseName;
        private long teacherCourseId;
        private String fname;
        private String lname;

        public EnrollmentResponse(String teacherUsername, String courseName, long teacherCourseId,String fname,String lname) {
            this.teacherUsername = teacherUsername;
            this.courseName = courseName;
            this.teacherCourseId=teacherCourseId;
            this.fname=fname;
            this.lname=lname;
        }

        public String getTeacherUsername() {
            return teacherUsername;
        }

        public String getCourseName() {
            return courseName;
        }
        public long getTeacherCourseId() {
            return teacherCourseId;
        }

        public String getFname() {
            return fname;
        }

        public String getLname() {
            return lname;
        }
    }
}
