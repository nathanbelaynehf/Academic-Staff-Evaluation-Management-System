package com.example.asemsBack.Service;

import com.example.asemsBack.Model.Semester;
import com.example.asemsBack.Repository.SemesterRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class SemesterService {
     @Autowired
     SemesterRepo semesterRepo;

    public void updateSemesterStatus() {
        Date currentDate = new Date(System.currentTimeMillis()); // Get the current date

        // Fetch all semesters
        List<Semester> semesters = semesterRepo.findAll();

        for (Semester semester : semesters) {
            // Check if the semester's endDate is less than the current date
            if (semester.getEndDate().before(currentDate)) {
                semester.setIsActive(false); // Set isActive to false
                semesterRepo.save(semester); // Save the updated semester
            }
        }
    }
}