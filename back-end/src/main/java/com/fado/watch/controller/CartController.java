package com.fado.watch.controller;


import com.fado.watch.dto.response.CartDto;
import com.fado.watch.entity.Cart;
import com.fado.watch.service.ICartService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/v1/cart")
public class CartController {

    private final ICartService cartService;

    public CartController(ICartService cartService) {
        this.cartService = cartService;
    }

    @GetMapping
    public ResponseEntity<List<CartDto>> findAllByCustomerId(@RequestParam("id") Integer id) {
        return ResponseEntity.ok(this.cartService.findAllByCustomerId(id));
    }

    @PostMapping
    public ResponseEntity<Cart> addToCart(@RequestBody Cart cart) {
        return ResponseEntity.ok(this.cartService.addToCart(cart));
    }

    @PutMapping("updateQuantity")
    public ResponseEntity<Cart> updateQuantity(@RequestBody Cart cart) {
        return ResponseEntity.ok(this.cartService.updateQuantity(cart));
    }

    @DeleteMapping
    public void delete(@RequestParam("id") Integer id) {
        this.cartService.delete(id);
    }

    @DeleteMapping("/deleteByCustomer/{id}")
    public void deleteByCustomer(@PathVariable("id") Integer id) {
        this.cartService.deleteAllByCustomerId(id);
    }
}
