package com.fado.watch.controller;


import com.fado.watch.dto.response.CartResponse;
import com.fado.watch.entity.Order;
import com.fado.watch.service.IOrderDetailService;
import com.fado.watch.service.IOrderService;
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

    @PostMapping()
    public void save(@RequestBody CartResponse response) {
        this.orderDetailService.save(response);
    }
}
