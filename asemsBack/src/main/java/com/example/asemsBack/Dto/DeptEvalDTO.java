package com.example.asemsBack.Dto;

public class DeptEvalDTO {
    private long id;
    private long criteriaId;
    private long teacherId;
    private long departmentHeadId;

    public DeptEvalDTO(long id, long criteriaId, long teacherId, long departmentHeadId) {
        this.id = id;
        this.criteriaId = criteriaId;
        this.teacherId = teacherId;
        this.departmentHeadId = departmentHeadId;
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

    public long getTeacherId() {
        return teacherId;
    }

    public void setTeacherId(long teacherId) {
        this.teacherId = teacherId;
    }

    public long getDepartmentHeadId() {
        return departmentHeadId;
    }

    public void setDepartmentHeadId(long departmentHeadId) {
        this.departmentHeadId = departmentHeadId;
    }
}
