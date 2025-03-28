package com.example.asemsBack.Notification;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/ad")
@CrossOrigin(origins = "http://localhost:5173")
public class ADNotificationController {

    @Autowired
    ADNotificationScheduler notificationScheduler;

    @GetMapping("/notifications")
    public List<String> getAcademicDeanNotifications() {
        notificationScheduler.checkForAcademicDeanNotifications();
        return notificationScheduler.getAcademicDeanNotifications();
    }
}
