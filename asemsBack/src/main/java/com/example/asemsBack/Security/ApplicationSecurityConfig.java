package com.example.asemsBack.Security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.security.SecurityProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

import static org.springframework.security.config.Customizer.withDefaults;

@Configuration
@EnableWebSecurity
public class ApplicationSecurityConfig {

    @Bean
    @Order(SecurityProperties.BASIC_AUTH_ORDER)
    public SecurityFilterChain securityChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(authorizeRequests ->
                        authorizeRequests
                                .requestMatchers("/admin/**").hasAuthority("ROLE_ADMIN")
                                .requestMatchers("/ad/**").hasAuthority("ROLE_AD")
                                .requestMatchers("/dh/**").hasAuthority("ROLE_DH")
                                .requestMatchers("/reg/**").hasAuthority("ROLE_REG")
                                .requestMatchers("/stud/**").hasAuthority("ROLE_STUDENT")
                                .requestMatchers("/teach/**").hasAuthority("ROLE_TEACHER")
                                .anyRequest().authenticated()
                )

                .formLogin(form -> form
                        .loginPage("/")
                       .successHandler(authenticationSuccessHandler())
                        .permitAll()) // CORS Configuration
         .cors(cors -> cors.configurationSource(corsConfigurationSource()));  // CORS Configuration


        return http.build();
    }

    @Bean
    public AuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        provider.setPasswordEncoder(new BCryptPasswordEncoder(10));
        provider.setUserDetailsService(userDetailsService);
        return provider;
    }

    @Autowired
    private MyUserDetailsService userDetailsService;

    @Bean
    public UserDetailsService userDetailsService() {
        return new MyUserDetailsService();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowedOrigins(Arrays.asList("http://localhost:5173"));  // Specify the allowed origin
        config.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        config.setAllowedHeaders(Arrays.asList("*"));  // Allow all headers
        config.setAllowCredentials(true);  // Allow credentials (cookies)

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);  // Apply to all endpoints
        return source;
    }


    public AuthenticationSuccessHandler authenticationSuccessHandler() {
        return (request, response, authentication) -> {
            System.out.println("Authentication Success Handler Called!");
            authentication.getAuthorities().forEach(auth -> System.out.println("Authority: " + auth.getAuthority()));

            String role = authentication.getAuthorities().stream()
                    .map(auth -> auth.getAuthority())
                    .findFirst()
                    .orElse("ROLE_USER");

//            if ("ROLE_ADMIN".equals(role)) {
//                System.out.println("Redirecting to /admin");
//                response.sendRedirect("/admin");
//            } else if ("ROLE_DH".equals(role)) {
//                System.out.println("Redirecting to /dh");
//                response.sendRedirect("/dh");
//            } else if ("ROLE_AD".equals(role)) {
//                System.out.println("Redirecting to /ad");
//                response.sendRedirect("/ad");
//            } else if ("ROLE_REG".equals(role)) {
//                System.out.println("Redirecting to /reg");
//                response.sendRedirect("/reg");
//            } else {
//                System.out.println("Redirecting to /error");
//             response.sendRedirect("/error");
//            }
        };

    }
}