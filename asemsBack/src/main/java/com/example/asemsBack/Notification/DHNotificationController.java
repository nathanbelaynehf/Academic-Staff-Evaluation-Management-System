package com.example.asemsBack.Notification;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/dh")
@CrossOrigin(origins = "http://localhost:5173")
public class DHNotificationController {

    @Autowired
    DHNotificationScheduler dhNotificationScheduler;

    @GetMapping("/notifications")
    public List<String> getDepartmentHeadNotifications() {
        // Manually trigger the Department Head notification check
        dhNotificationScheduler.checkForDepartmentHeadNotifications();
        // Fetch the Department Head notification messages
        return dhNotificationScheduler.getDepartmentHeadNotifications();
    }
}
