package com.example.asemsBack.Dto;

public class StudEvalDTO {
    private long id;
    private long criteriaId;
    private long tacherCourseId;
    private long Studid;

    public StudEvalDTO(long id, long criteriaId, long tacherCourseId, long studid) {
        this.id = id;
        this.criteriaId = criteriaId;
        this.tacherCourseId = tacherCourseId;
        Studid = studid;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public long getCriteriaId() {
        return criteriaId;
    }

    public void setCriteriaId(long criteriaId) {
        this.criteriaId = criteriaId;
    }

    public long getTacherCourseId() {
        return tacherCourseId;
    }

    public void setTacherCourseId(long tacherCourseId) {
        this.tacherCourseId = tacherCourseId;
    }

    public long getStudid() {
        return Studid;
    }

    public void setStudid(long studid) {
        Studid = studid;
    }
}
