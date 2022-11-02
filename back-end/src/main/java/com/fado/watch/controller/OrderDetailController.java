package com.fado.watch.controller;


import com.fado.watch.dto.response.CartResponse;
import com.fado.watch.entity.Order;
import com.fado.watch.entity.OrderDetail;
import com.fado.watch.service.IOrderDetailService;
import com.fado.watch.service.IOrderService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/v1/order-detail")
public class OrderDetailController {

    private final IOrderDetailService orderDetailService;


    public OrderDetailController(IOrderDetailService orderDetailService) {
        this.orderDetailService = orderDetailService;
    }

    @GetMapping
    public ResponseEntity<List<OrderDetail>> getAll() {
        return ResponseEntity.ok(this.orderDetailService.getAll());
    }

    @GetMapping("findAllByOrderId/{id}")
    public ResponseEntity<List<OrderDetail>> findAllByOrderId(@PathVariable("id") Integer id) {
        return ResponseEntity.ok(this.orderDetailService.getAllOrderDetailInOrder(id));
    }

    @PostMapping()
    public void save(@RequestBody CartResponse response) {
        this.orderDetailService.save(response);
    }

    @PostMapping("/admin")
    public ResponseEntity<OrderDetail> save(@RequestBody OrderDetail orderDetail) {
        return new ResponseEntity<>(this.orderDetailService.saveOrderDetail(orderDetail), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable("id") Integer id) {
        this.orderDetailService.delete(id);
    }
}
