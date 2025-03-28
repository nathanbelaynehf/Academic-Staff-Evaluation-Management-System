package com.example.asemsBack.Dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Date;
@Getter
@Setter
@NoArgsConstructor
public class StudentDataDTO {

    private long id;

    private int batchYear;

    private String fname;

    private String lname;

    private String gname;

    private String username;

    private String role;

    private Date dob;

    private String sex;

    private boolean status;

    private Date dateOfReg;

    private String Nationality;

    private String city;

    private String subCity;

    private String kebele;

    private int pnum;

    private String email;

    private long classid;

    private String className;

    public StudentDataDTO(long id, int batchYear, String fname, String lname, String gname, String username, String role, Date dob, String sex, boolean status, Date dateOfReg, String Nationality, String city, String subCity, String kebele, int pnum, String email,long classid,String className) {
        this.id = id;
        this.batchYear = batchYear;
        this.fname = fname;
        this.lname = lname;
        this.gname = gname;
        this.username = username;
        this.role = role;
        this.dob = dob;
        this.sex = sex;
        this.status = status;
        this.dateOfReg = dateOfReg;
        this.Nationality = Nationality;
        this.city = city;
        this.subCity = subCity;
        this.kebele = kebele;
        this.pnum = pnum;
        this.email = email;
        this.classid=classid;
        this.className=className;
    }
}
