package com.example.asemsBack.Security;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class Role {
    @GetMapping("/role")
    public ResponseEntity<String> getUserRole(Authentication authentication) {
        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.ok("ROLE_GUEST"); // Default role for guests
        }

        String role = authentication.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .findFirst()
                .orElse("ROLE_GUEST"); // Default role if no authorities found
        return ResponseEntity.ok(role);
    }

}
