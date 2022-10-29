package com.fado.watch.controller;

import com.fado.watch.entity.Address;
import com.fado.watch.service.IAddressService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/v1/address")
public class AddressController {

    private final IAddressService iAddressService;

    public AddressController(IAddressService iAddressService) {
        this.iAddressService = iAddressService;
    }

    @GetMapping("{id}")
    public ResponseEntity<Address> findById(@PathVariable("id") Integer id) {
        return ResponseEntity.ok(this.iAddressService.findById(id));
    }

    @GetMapping("/default/{id}")
    public ResponseEntity<Address> findByCustomerIdAndDefaultAddress(@PathVariable("id") Integer id) {
        return ResponseEntity.ok(this.iAddressService.findByCustomerIdAndDefaultAddress(id));
    }

    @GetMapping
    public ResponseEntity<List<Address>> findByCustomerId(@RequestParam("idCtm") Integer id) {
        return ResponseEntity.ok(this.iAddressService.findByCustomerId(id));
    }

    @PostMapping
    public ResponseEntity<Address> create(@RequestBody Address address) {
        return ResponseEntity.ok(this.iAddressService.create(address));
    }

//    @PutMapping
//    public ResponseEntity<Address> update(@RequestBody Address address) {
//        return ResponseEntity.ok(this.iAddressService.update(address));
//    }

    @DeleteMapping("{id}")
    public void delete(@PathVariable("id") Integer id) {
        this.iAddressService.delete(id);
    }
}
