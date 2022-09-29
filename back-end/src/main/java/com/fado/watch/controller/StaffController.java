package com.fado.watch.controller;


import com.fado.watch.entity.Staff;
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

    public StaffController(IStaffService iStaffService) {
        this.iStaffService = iStaffService;
    }

    @GetMapping
    public ResponseEntity<List<Staff>> findAll() {
        return new ResponseEntity<>(this.iStaffService.findAll(), HttpStatus.OK);
    }

    @GetMapping("{id}")
    public ResponseEntity<Staff> findById(@PathVariable("id") Integer id) {
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

}
