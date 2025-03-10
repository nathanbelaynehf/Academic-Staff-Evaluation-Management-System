package com.example.asemsBack.Service;

import com.example.asemsBack.Model.DepartmentHead;
import com.example.asemsBack.Model.Registrar;
import com.example.asemsBack.Model.Users;
import com.example.asemsBack.Repository.RegistrarRepo;
import com.example.asemsBack.Repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RegistrarRegistrationService {


    @Autowired
    private UserRepo userRepository;

    @Autowired
    RegistrarRepo registrarRepo;

    public void registerRegistrar(Users user, String qualification, int yearsOfExperience) {
        Users savedUser = userRepository.save(user);
        Registrar registrar =new Registrar();
        registrar.setUser(savedUser);
        registrar.setQualification(qualification);
        registrar.setYearsOfExperience(yearsOfExperience);
        registrarRepo.save(registrar);
    }
}
