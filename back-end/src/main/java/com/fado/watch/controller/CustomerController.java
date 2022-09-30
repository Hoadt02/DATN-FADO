package com.fado.watch.controller;

import com.fado.watch.entity.Customer;
import com.fado.watch.service.ICustomerService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/v1/customer")
public class CustomerController {

    private final ICustomerService iCustomerService;

    public CustomerController(ICustomerService iCustomerService) {
        this.iCustomerService = iCustomerService;
    }


    @GetMapping
    public ResponseEntity<List<Customer>> findAll(){
       return new ResponseEntity<>(this.iCustomerService.findAll(), HttpStatus.OK);
    }
}
