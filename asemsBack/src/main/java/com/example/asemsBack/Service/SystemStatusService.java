package com.example.asemsBack.Service;

import com.example.asemsBack.Model.PerformanceMetrics;
import com.example.asemsBack.Model.SystemStatus;
import com.example.asemsBack.Repository.PerformanceMetricsRepository;
import com.example.asemsBack.Repository.SystemStatusRepository;
import io.micrometer.core.instrument.MeterRegistry;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.lang.management.ManagementFactory;
import java.lang.management.OperatingSystemMXBean;
import java.time.LocalDateTime;

@Service
public class SystemStatusService {

    @Autowired
    private SystemStatusRepository systemStatusRepository;

    @Autowired
    private PerformanceMetricsRepository performanceMetricsRepository;

    @Autowired
    private MeterRegistry meterRegistry;

    public SystemStatus getSystemStatus() {
        OperatingSystemMXBean osBean = ManagementFactory.getOperatingSystemMXBean();
        SystemStatus status = new SystemStatus();
        status.setUptime("Uptime: " + ManagementFactory.getRuntimeMXBean().getUptime() + " ms");
        status.setLoad(osBean.getSystemLoadAverage());
        status.setTimestamp(LocalDateTime.now());
        return systemStatusRepository.save(status);
    }

    public PerformanceMetrics getPerformanceMetrics() {
        PerformanceMetrics metrics = new PerformanceMetrics();
        metrics.setCpuUsage(meterRegistry.find("system.cpu.usage").gauge().value());
        metrics.setMemoryUsage(meterRegistry.find("jvm.memory.used").gauge().value());
        metrics.setTimestamp(LocalDateTime.now());
        return performanceMetricsRepository.save(metrics);
    }
}