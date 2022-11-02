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

    @GetMapping("findAllByCustomerId/{id}")
    public ResponseEntity<List<Order>> findAllByCustomerId(@PathVariable("id") Integer id) {
        return ResponseEntity.ok(this.iOrderService.findAllByCustomerId(id));
    }

    @PostMapping()
    public ResponseEntity<Order> save(@RequestBody Order order) {
        return ResponseEntity.ok(this.iOrderService.save(order));
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable("id") Integer id) {
        this.iOrderService.delete(id);
    }
    @GetMapping("/updateStatus")
    public void updateStatus(@RequestParam("status") Integer status, @RequestParam("id") Integer id) {
        this.iOrderService.updateStatus(status, id);

    }
}
