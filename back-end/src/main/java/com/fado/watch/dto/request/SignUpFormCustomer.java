package com.fado.watch.dto.request;

import com.fado.watch.entity.Role;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

import java.time.LocalDate;

@Data
public class SignUpFormCustomer {
    private String firstname;
    private String lastname;
    private LocalDate dateOfBirth;
    private String image;
    private String username;
    private String password;
    private String email;
    private String phoneNumber;
    private boolean gender;
    private Integer status;
    private Role role;
}
