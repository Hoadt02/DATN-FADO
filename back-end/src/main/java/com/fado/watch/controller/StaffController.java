package com.fado.watch.controller;


import com.fado.watch.dto.response.StaffDto;
import com.fado.watch.entity.Customer;
import com.fado.watch.entity.Staff;
import com.fado.watch.service.ISendEmailService;
import com.fado.watch.service.IStaffService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/v1/staff")
public class StaffController {

    private final IStaffService iStaffService;

    private final ISendEmailService sendEmailService;

    public StaffController(IStaffService iStaffService, ISendEmailService iSendEmailService) {
        this.iStaffService = iStaffService;
        this.sendEmailService = iSendEmailService;
    }

    @GetMapping
    public ResponseEntity<List<Staff>> findAll() {
        return new ResponseEntity<>(this.iStaffService.findAll(), HttpStatus.OK);
    }

    @GetMapping("{id}")
    public ResponseEntity<StaffDto> findById(@PathVariable("id") Integer id) {
        return new ResponseEntity<>(this.iStaffService.findById(id), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Staff> create(@RequestBody Staff staff) {
        return new ResponseEntity<>(this.iStaffService.create(staff), HttpStatus.OK);
    }

    @PutMapping("{id}")
    public ResponseEntity<Staff> update(@RequestBody Staff staff) {
        return new ResponseEntity<>(this.iStaffService.update(staff), HttpStatus.OK);
    }

    @PostMapping("/findStaffByEmailAndSendOTP")
    public ResponseEntity<Staff> findCustomerByEmailAndSendOTP(@RequestBody String email) {
        if (iStaffService.existsByEmail(email)){
            sendEmailService.sendMailOTP(email);
        }
        return new ResponseEntity<>(this.iStaffService.findStaffByEmail(email), HttpStatus.OK);
    }

}
