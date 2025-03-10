package com.example.asemsBack.Service;

import com.example.asemsBack.Model.Users;
import com.example.asemsBack.Repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RegisterAuthoritiesService {

    @Autowired
    private UserRepo urepo;

    public void RegisterUser(Users user) {
        urepo.save(user);
}}
