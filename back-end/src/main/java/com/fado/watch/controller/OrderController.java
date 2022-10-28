package com.fado.watch.controller;


import com.fado.watch.entity.Order;
import com.fado.watch.service.IOrderService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/v1/order")
public class OrderController {

    private final IOrderService iOrderService;


    public OrderController(IOrderService iOrderService) {
        this.iOrderService = iOrderService;
    }

    @GetMapping
    public ResponseEntity<List<Order>> getAll() {
        return ResponseEntity.ok(this.iOrderService.getAll());
    }

    @PostMapping()
    public ResponseEntity<Order> save(@RequestBody Order order) {
        return ResponseEntity.ok(this.iOrderService.save(order));
    }
}
