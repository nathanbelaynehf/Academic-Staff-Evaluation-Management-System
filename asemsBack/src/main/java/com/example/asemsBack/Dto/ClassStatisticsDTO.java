package com.example.asemsBack.Dto;

public class ClassStatisticsDTO {
    private Long classId;
    private String className;
    private String program;
    private Long totalStudents;
    private Long evaluatedStudents;

    public ClassStatisticsDTO(Long classId, String className, String program, Long totalStudents, Long evaluatedStudents) {
        this.classId = classId;
        this.className = className;
        this.program = program;
        this.totalStudents = totalStudents;
        this.evaluatedStudents = evaluatedStudents;
    }

    public String getProgram() {
        return program;
    }

    public void setProgram(String program) {
        this.program = program;
    }

    public Long getClassId() {
        return classId;
    }

    public void setClassId(Long classId) {
        this.classId = classId;
    }

    public String getClassName() {
        return className;
    }

    public void setClassName(String className) {
        this.className = className;
    }

    public Long getTotalStudents() {
        return totalStudents;
    }

    public void setTotalStudents(Long totalStudents) {
        this.totalStudents = totalStudents;
    }

    public Long getEvaluatedStudents() {
        return evaluatedStudents;
    }

    public void setEvaluatedStudents(Long evaluatedStudents) {
        this.evaluatedStudents = evaluatedStudents;
    }
}
