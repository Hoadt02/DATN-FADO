package com.fado.watch.controller;


import com.fado.watch.entity.Voucher;
import com.fado.watch.service.IVoucherService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("api/v1/voucher")
public class VoucherController {
    private final IVoucherService iVoucherService;

    public VoucherController(IVoucherService iVoucherService) {
        this.iVoucherService = iVoucherService;
    }

    @GetMapping
    public ResponseEntity<List<Voucher>> getALl(){
        return ResponseEntity.ok(this.iVoucherService.getAll());
    }
    @GetMapping("{id}")
    public ResponseEntity<Voucher> getById(@PathVariable("id") Integer id){
        return  ResponseEntity.ok(this.iVoucherService.getById(id));
    }
    @PostMapping
    public ResponseEntity<Voucher> create(@RequestBody Voucher voucher){
        return ResponseEntity.ok(this.iVoucherService.create(voucher));
    }
    @PutMapping("{id}")
    public ResponseEntity<Voucher> updatEntity(@RequestBody Voucher voucher){
        return ResponseEntity.ok(this.iVoucherService.update(voucher));
    }
}
