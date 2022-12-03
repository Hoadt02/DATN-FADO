package com.fado.watch.controller;


import com.fado.watch.dto.request.FilterOrder;
import com.fado.watch.dto.response.CharBarDTO;
import com.fado.watch.dto.response.OrderCancelDTO;
import com.fado.watch.dto.response.TotalOrderDTO;
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

    @GetMapping("/{id}")
    public ResponseEntity<Order> findById(@PathVariable("id") Integer id) {
        return ResponseEntity.ok(this.iOrderService.findById(id));
    }

    @GetMapping("/chartBar")
    public ResponseEntity<List<CharBarDTO>> chartBar(){
        return ResponseEntity.ok(this.iOrderService.getChartBar());
    }
    @GetMapping("/totalRevenue")
    public ResponseEntity<Integer> totalRevenue(){
        return ResponseEntity.ok(this.iOrderService.getTotalRevenue());
    }

    @GetMapping("/totalOrder")
    public ResponseEntity<List<TotalOrderDTO>> totalOrder(){
        return ResponseEntity.ok(this.iOrderService.getTotalOrder());
    }

    @GetMapping("/orderCancel")
    public ResponseEntity<List<OrderCancelDTO>> orderCancel(){
        return ResponseEntity.ok(this.iOrderService.getOrderCancel());
    }

    @GetMapping("/totalOneDay")
    public ResponseEntity<Integer> totalOneDay() { return ResponseEntity.ok(this.iOrderService.getTotalOneDay()); }
    // Day la` pha`n toi nha' ba.n hien da.u da.u
    @GetMapping("getOrderByStaff/{id}")
    public ResponseEntity<List<Order>> getOrderByStaff(@PathVariable("id") Integer id) {
        return ResponseEntity.ok(this.iOrderService.getOrderByStaff(id));
    }

    @PutMapping("/payment/{id}")
    public ResponseEntity<Order> updateMua(@RequestBody Order order) {
        return ResponseEntity.ok(this.iOrderService.updateMua(order));
    }

    @PutMapping("/cancel/{id}")
    public ResponseEntity<Order> updateHuy(@RequestBody Order order) {
        return ResponseEntity.ok(this.iOrderService.updateHuy(order));
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

    @PostMapping("/filterOrder")
    public ResponseEntity<List<Order>> filterOrder(@RequestBody FilterOrder filterOrder) {
        return ResponseEntity.ok(this.iOrderService.filterOrder(filterOrder));
    }
}
