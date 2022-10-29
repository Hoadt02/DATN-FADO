package com.fado.watch.controller;

import com.fado.watch.dto.request.SignInForm;
import com.fado.watch.dto.request.SignUpFormCustomer;
import com.fado.watch.dto.response.JwtResponse;
import com.fado.watch.dto.response.ResponseMessage;
import com.fado.watch.entity.Customer;
import com.fado.watch.security.jwt.JwtProvider;
import com.fado.watch.service.ICustomerService;
import com.fado.watch.service.IStaffService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.security.auth.login.LoginException;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    IStaffService staffService;
    @Autowired
    ICustomerService customerService;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    JwtProvider jwtProvider;

    @Autowired
    @Qualifier("authenticationManager1")
    AuthenticationManager authenticationManager1;

    @Autowired
    @Qualifier("authenticationManager2")
    AuthenticationManager authenticationManager2;


    @PostMapping("/sign-up-customer")
    public ResponseEntity<?> register(@RequestBody SignUpFormCustomer signUpFormCustomer){
        if(customerService.existsByUsername(signUpFormCustomer.getUsername())){
            return new ResponseEntity<>(new ResponseMessage("The username is existed"), HttpStatus.OK);
        }
        if(customerService.existsByEmail(signUpFormCustomer.getEmail())){
            return new ResponseEntity<>(new ResponseMessage("The email is existed"), HttpStatus.OK);
        }
        signUpFormCustomer.setPassword(passwordEncoder.encode(signUpFormCustomer.getPassword()));
        ModelMapper mapper = new ModelMapper();
        Customer customer = mapper.map(signUpFormCustomer, Customer.class);
        customerService.create(customer);
        return new ResponseEntity<>(new ResponseMessage("Create success!"), HttpStatus.OK);
    }

    @PostMapping("/sign-in-staff")
    public ResponseEntity<?> loginStaff(@RequestBody SignInForm signInForm) {
        try {
            Authentication authentication = authenticationManager1.authenticate(
                    new UsernamePasswordAuthenticationToken(signInForm.getUsername(), signInForm.getPassword())
            );
            SecurityContextHolder.getContext().setAuthentication(authentication);
            String token = jwtProvider.createTokenStaff(authentication);
            return ResponseEntity.ok(new JwtResponse(token));
        }catch (Exception e){
            return new ResponseEntity<>(new ResponseMessage("Sai thông tin đăng nhập!"), HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/sign-in-customer")
    public ResponseEntity<?> loginCustomer(@RequestBody SignInForm signInForm){
       try {
           Authentication authentication = authenticationManager2.authenticate(
                   new UsernamePasswordAuthenticationToken(signInForm.getUsername(), signInForm.getPassword())
           );
           SecurityContextHolder.getContext().setAuthentication(authentication);
           String token = jwtProvider.createTokenCustomer(authentication);
           return ResponseEntity.ok(new JwtResponse(token));
       }catch (Exception e){
           return new ResponseEntity<>(new ResponseMessage("Sai thông tin đăng nhập!"), HttpStatus.BAD_REQUEST);
       }
    }
}
