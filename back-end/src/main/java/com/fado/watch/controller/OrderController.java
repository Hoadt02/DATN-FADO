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

    @GetMapping("/updateStatus")
    public void updateStatus(@RequestParam("status") Integer status, @RequestParam("id") Integer id) {
        this.iOrderService.updateStatus(status, id);
    }

    // Day la` pha`n toi nha' ba.n hien da.u da.u
    @GetMapping("getOrderByStaff/{id}")
    public ResponseEntity<List<Order>> getOrderByStaff(@PathVariable("id") Integer id) {
        return ResponseEntity.ok(this.iOrderService.getOrderByStaff(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Order> update(@RequestBody Order order) {
        return ResponseEntity.ok(this.iOrderService.update(order));
    }

    @GetMapping("/getOrderById")
    public ResponseEntity<List<Order>> getOrderById(@RequestParam("id") Integer id) {
        return ResponseEntity.ok(this.iOrderService.getOrderById(id));
    }

    @GetMapping("/getOrderHistory")
    public ResponseEntity<List<Order>> getOrderHistory(@RequestParam("id") Integer id, @RequestParam("status") Integer status) {
        return ResponseEntity.ok(this.iOrderService.getOrderHistory(id, status));
    }

    @GetMapping("/export/{id}")
    public void export(@PathVariable("id") Integer id) {
        this.iOrderService.exportOrder(id);
    }
}
