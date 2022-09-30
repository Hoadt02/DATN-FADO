package com.fado.watch.controller;

import com.fado.watch.entity.ProductDetail;
import com.fado.watch.service.IProductDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/v1/productDetail")
public class ProductDetailsController {
    @Autowired
    IProductDetailService service;

    @GetMapping()
    public ResponseEntity<List<ProductDetail>> getAll(){
        return new ResponseEntity<>(this.service.getAll(), HttpStatus.OK);
    }

    @GetMapping("id")
    public ResponseEntity<ProductDetail> findProductDetail(@PathVariable("id") Integer id){
        return new ResponseEntity<>(this.service.findProductDetails(id), HttpStatus.OK);
    }

    @PostMapping()
    public ResponseEntity<ProductDetail> create(@RequestBody ProductDetail productDetail){
        return new ResponseEntity<>(this.service.create(productDetail), HttpStatus.OK);
    }

    @PutMapping("id")
    public ResponseEntity<ProductDetail> update(@RequestBody ProductDetail productDetail){
        return new ResponseEntity<>(this.service.update(productDetail), HttpStatus.OK);
    }
}
