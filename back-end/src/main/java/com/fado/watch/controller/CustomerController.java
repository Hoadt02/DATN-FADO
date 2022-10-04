package com.fado.watch.controller;

import com.fado.watch.entity.Customer;
import com.fado.watch.service.ICustomerService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    @GetMapping("{id}")
    public ResponseEntity<Customer> findById(@PathVariable("id") Integer id) {
        return new ResponseEntity<>(this.iCustomerService.findbyId(id), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Customer> create(@RequestBody Customer customer) {
        return new ResponseEntity<>(this.iCustomerService.create(customer), HttpStatus.OK);
    }

    @PutMapping("{id}")
    public ResponseEntity<Customer> update(@RequestBody Customer customer) {
        return new ResponseEntity<>(this.iCustomerService.update(customer), HttpStatus.OK);
    }
}
