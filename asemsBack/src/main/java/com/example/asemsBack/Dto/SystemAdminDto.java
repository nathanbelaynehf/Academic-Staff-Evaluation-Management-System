package com.example.asemsBack.Dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SystemAdminDto {
    private long id;

    private String fname;

    private String lname;

    private String gname;

    private String username;

    private String sex;
}
