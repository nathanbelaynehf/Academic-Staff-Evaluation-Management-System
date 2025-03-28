package com.example.asemsBack.Control.SystemAdminControls;

import com.example.asemsBack.Model.DatabaseHealth;
import com.example.asemsBack.Model.PerformanceMetrics;
import com.example.asemsBack.Model.SystemStatus;
import com.example.asemsBack.Service.DatabaseHealthService;
import com.example.asemsBack.Service.SystemStatusService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/admin/status")
public class StatusController {

    @Autowired
    private SystemStatusService systemStatusService;


    @Autowired
    private DatabaseHealthService databaseHealthService;

    @GetMapping("/overview")
    public SystemStatus getSystemStatus() {
        return systemStatusService.getSystemStatus();
    }

    @GetMapping("/performance")
    public PerformanceMetrics getPerformanceMetrics() {
        return systemStatusService.getPerformanceMetrics();
    }

    @GetMapping("/database-health")
    public DatabaseHealth getDatabaseHealth() {
        return databaseHealthService.getDatabaseHealth();
    }
}