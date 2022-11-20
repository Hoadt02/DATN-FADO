package com.fado.watch.controller;

import com.fado.watch.entity.Brand;
import com.fado.watch.entity.Category;
import com.fado.watch.entity.Product;
import com.fado.watch.service.IProductService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/v1/product")
public class ProductController {

    private final IProductService iProductService;


    public ProductController(IProductService iProductService) {
        this.iProductService = iProductService;
    }

    @GetMapping
    public ResponseEntity<List<Product>> findAll() {
        return new ResponseEntity<>(this.iProductService.getAll(), HttpStatus.OK);
    }

    @GetMapping("{id}")
    public ResponseEntity<Product> findById(@PathVariable("id") Integer id) {
        return new ResponseEntity<>(this.iProductService.findById(id), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Product> create(@RequestBody Product product) {
        return new ResponseEntity<>(this.iProductService.create(product), HttpStatus.OK);
    }

    @PutMapping("{id}")
    public ResponseEntity<Product> update(@RequestBody Product product) {
        return new ResponseEntity<>(this.iProductService.update(product), HttpStatus.OK);
    }

    @GetMapping("findAllByCategoryId/{id}")
    public ResponseEntity<List<Product>> findAllByCategoryId(@PathVariable("id") Integer id) {
        return new ResponseEntity<>(this.iProductService.findAllByCategoryId(id), HttpStatus.OK);
    }
}
