package com.example.asemsBack.Notification;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/stud")
@CrossOrigin(origins = "http://localhost:5173")
public class StudentNotificationController {

    @Autowired
    private StudentNotificationScheduler notificationScheduler;

    @GetMapping("/notifications")
    public  List<String> getNotifications() {
        // Manually trigger the notification check
        notificationScheduler.checkForNotifications();
        // Fetch the notification message
        return notificationScheduler.getNotifications();
    }
}