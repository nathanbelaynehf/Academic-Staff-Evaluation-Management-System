package com.example.asemsBack.Service;

import com.example.asemsBack.Dto.EvaluationScoreDTO;
import com.example.asemsBack.Dto.StudentDTO;
import com.example.asemsBack.Dto.StudentEvaluationStatusDTO;
import com.example.asemsBack.Model.*;
import com.example.asemsBack.Repository.EnrollRepo;
import com.example.asemsBack.Repository.StudEvalRepository;
import com.example.asemsBack.Repository.StudRepo;
import com.example.asemsBack.Repository.UserRepo;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class StudentService {
    @Autowired
    private EnrollRepo enrollementRepository;

    @Autowired
    private StudRepo studentRepository;

    @Autowired
    private UserRepo userRepository;

    @Autowired
    StudEvalRepository studEvalRepository;

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

    public StudentEvaluationStatusDTO getStudentEvaluationStatus() {
        // Get authenticated student
        String username = getAuthenticatedUsername();
        Users user = userRepository.findByUsername(username);
        Student student = user.getStudent();

        // Get current semester enrollments
        List<Enrollement> enrollments = enrollementRepository.findByStudentIdAndActiveSemester(student.getId());
        List<TeacherCourse> teacherCourses = enrollments.stream()
                .map(Enrollement::getTeacherCourse)
                .collect(Collectors.toList());

        // Get evaluated course IDs
        List<Long> evaluatedCourseIds = studEvalRepository.findEvaluatedTeacherCourseIds(
                student.getId(), teacherCourses);

        // Prepare response
        int totalEnrolled = teacherCourses.size();
        int totalEvaluated = evaluatedCourseIds.size();

        // Get unevaluated courses
        List<StudentEvaluationStatusDTO.UnevaluatedCourseDTO> unevaluatedCourses = teacherCourses.stream()
                .filter(tc -> !evaluatedCourseIds.contains(tc.getId()))
                .map(tc -> new StudentEvaluationStatusDTO.UnevaluatedCourseDTO(
                        tc.getCourse().getCourseName(),
                        tc.getTeacher().getUser().getFname() + " " + tc.getTeacher().getUser().getLname(),
                        tc.getId()
                ))
                .collect(Collectors.toList());

        return new StudentEvaluationStatusDTO(totalEnrolled, totalEvaluated, unevaluatedCourses);
    }
    public EvaluationScoreDTO calculateEvaluationScore(Long studentId) {
        // 1. Single optimized query
        List<StudEvalRepository.EvaluationSumDTO> courseSums = studEvalRepository.sumScoresByCourse(studentId);

        if (courseSums.isEmpty()) {
            return new EvaluationScoreDTO(BigDecimal.ZERO);
        }

        // 2. In-memory aggregation
        BigDecimal totalSum = courseSums.stream()
                .map(StudEvalRepository.EvaluationSumDTO::getSummedScore)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        // 3. Final calculation
        BigDecimal percentage = totalSum
                .divide(new BigDecimal(courseSums.size() * 40), 4, RoundingMode.HALF_UP)
                .multiply(new BigDecimal(100));

        return new EvaluationScoreDTO(percentage);
    }
}
