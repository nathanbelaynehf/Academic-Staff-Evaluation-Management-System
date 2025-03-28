package com.example.asemsBack.Dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Date;
@Getter
@Setter
@NoArgsConstructor
public class DHDataDto {
    private long id;

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


    private String qualification;

    private String specialization;

    private int yearsOfExperience;

    private long dhId;

    private String dhName;

    public DHDataDto(long id, String fname, String lname, String gname, String username, String role, Date dob, String sex, boolean status, Date dateOfReg, String nationality, String city, String subCity, String kebele, int pnum, String email, String qualification, String specialization, int yearsOfExperience, long dhId, String dhName) {
        this.id = id;
        this.fname = fname;
        this.lname = lname;
        this.gname = gname;
        this.username = username;
        this.role = role;
        this.dob = dob;
        this.sex = sex;
        this.status = status;
        this.dateOfReg = dateOfReg;
        Nationality = nationality;
        this.city = city;
        this.subCity = subCity;
        this.kebele = kebele;
        this.pnum = pnum;
        this.email = email;
        this.qualification = qualification;
        this.specialization = specialization;
        this.yearsOfExperience = yearsOfExperience;
        this.dhId = dhId;
        this.dhName = dhName;
    }
}
