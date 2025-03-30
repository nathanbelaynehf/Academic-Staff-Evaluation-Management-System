package com.example.asemsBack.Service;

import com.example.asemsBack.Dto.SystemAdminDto;
import com.example.asemsBack.Model.SystemAdmin;
import com.example.asemsBack.Model.Users;
import com.example.asemsBack.Repository.SystemAdminRepo;
import com.example.asemsBack.Repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SystemAdminDataService {

    @Autowired
    UserRepo userRepo;

    @Autowired
    SystemAdminRepo systemAdminRepo;

    public SystemAdminDto getSystemAdminById(Long id){

        SystemAdmin systemAdmin=systemAdminRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("System Admin not found"));

        Users user=systemAdmin.getUser();

        SystemAdminDto systemAdminDto=new SystemAdminDto();

        systemAdminDto.setId(systemAdminDto.getId());
        systemAdminDto.setFname(user.getFname());
        systemAdminDto.setLname(user.getLname());
        systemAdminDto.setGname(user.getGname());
        systemAdminDto.setUsername(user.getUsername());
        return systemAdminDto;
    }
}
