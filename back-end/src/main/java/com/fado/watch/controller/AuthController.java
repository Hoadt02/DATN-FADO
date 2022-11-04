package com.fado.watch.controller;

import com.fado.watch.dto.request.SignInForm;
import com.fado.watch.dto.response.JwtResponse;
import com.fado.watch.entity.Customer;
import com.fado.watch.entity.Staff;
import com.fado.watch.exception.LoginFailedException;
import com.fado.watch.exception.UserDisableException;
import com.fado.watch.security.jwt.JwtProvider;
import com.fado.watch.service.ICustomerService;
import com.fado.watch.service.IStaffService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    IStaffService staffService;

    @Autowired
    ICustomerService customerService;

    @Autowired
    JwtProvider jwtProvider;

    @Autowired
    @Qualifier("authenticationManager1")
    AuthenticationManager authenticationManager1;

    @Autowired
    @Qualifier("authenticationManager2")
    AuthenticationManager authenticationManager2;

    @Autowired
    PasswordEncoder passwordEncoder;

    @PostMapping("/sign-in-staff")
    public ResponseEntity<?> loginStaff(@RequestBody SignInForm signInForm) {
        Staff staff = staffService.findByUsername(signInForm.getUsername());

        if (!staff.getUsername().equals(signInForm.getUsername()) || !passwordEncoder.matches(signInForm.getPassword(), staff.getPassword())) {
            throw new LoginFailedException("Sai thông tin đăng nhập!");
        }else if (staff.getStatus() == 0) {
            throw new UserDisableException("Tài khoản của bạn đã bị vô hiệu hóa, vui lòng liên hệ quản trị viên để kích hoạt lại!");
        }else {
            Authentication authentication = authenticationManager1.authenticate(
                    new UsernamePasswordAuthenticationToken(signInForm.getUsername(), signInForm.getPassword())
            );
            SecurityContextHolder.getContext().setAuthentication(authentication);
            String token = jwtProvider.createTokenStaff(authentication);
            return ResponseEntity.ok(new JwtResponse(token));
        }
    }

    @PostMapping("/sign-in-customer")
    public ResponseEntity<?> loginCustomer(@RequestBody SignInForm signInForm) {
        Customer customer = customerService.findByUsername(signInForm.getUsername());

        if (!customer.getUsername().equals(signInForm.getUsername()) || !passwordEncoder.matches(signInForm.getPassword(), customer.getPassword())) {
            throw new LoginFailedException("Sai thông tin đăng nhập!");
        }else if (customer.getStatus() == 0) {
            throw new UserDisableException("Tài khoản của bạn đã bị vô hiệu hóa!");
        }else {
            Authentication authentication = authenticationManager2.authenticate(
                    new UsernamePasswordAuthenticationToken(signInForm.getUsername(), signInForm.getPassword())
            );
            SecurityContextHolder.getContext().setAuthentication(authentication);
            String token = jwtProvider.createTokenCustomer(authentication);
            return ResponseEntity.ok(new JwtResponse(token));
        }
    }
}
