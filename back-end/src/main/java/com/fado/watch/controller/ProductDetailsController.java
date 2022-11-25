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

    @GetMapping("/filter")
    public ResponseEntity<List<ProductDetail>> getProductDetailByFilter(@RequestParam(name = "category_id", defaultValue = "") Integer[] category_id,
                                                                        @RequestParam(name = "brand_id", defaultValue = "") Integer[] brand_id,
                                                                        @RequestParam(name = "material_id", defaultValue = "") Integer[] material_id,
                                                                        @RequestParam(name = "origin_id", defaultValue = "") Integer[] origin_id,
                                                                        @RequestParam(name = "gender", defaultValue = "") Boolean[] gender,
                                                                        @RequestParam(name = "startPrice", defaultValue = "") Integer startPrice,
                                                                        @RequestParam(name = "endPrice", defaultValue = "") Integer endPrice){

        return new ResponseEntity<>(this.service.getProductDetailByFilter(category_id,brand_id,material_id,origin_id,gender,startPrice,endPrice), HttpStatus.OK);
    }

    @GetMapping("{id}")
    public ResponseEntity<ProductDetail> findProductDetail(@PathVariable("id") Integer id){
        return new ResponseEntity<>(this.service.findProductDetails(id), HttpStatus.OK);
    }

    @PostMapping()
    public ResponseEntity<ProductDetail> create(@RequestBody ProductDetail productDetail){
        return new ResponseEntity<>(this.service.create(productDetail), HttpStatus.OK);
    }

    @PutMapping("{id}")
    public ResponseEntity<ProductDetail> update(@RequestBody ProductDetail productDetail){
        return new ResponseEntity<>(this.service.update(productDetail), HttpStatus.OK);
    }

    @GetMapping("/similar/{id}")
    public ResponseEntity<List<ProductDetail>> getSimilarProduct(@PathVariable("id") Integer id){
        return new ResponseEntity<>(this.service.getSimilarProduct(id), HttpStatus.OK);
    }

    @GetMapping("/find")
    public ResponseEntity<List<ProductDetail>> getProductByName(@RequestParam("name") String name) {
        return new ResponseEntity<>(this.service.findProductByName(name), HttpStatus.OK);
    }

    @GetMapping("/listTop3Pro")
    public ResponseEntity<List<ProductDetail>> getListTop3Pro(){
        return new ResponseEntity<>(this.service.getlistTop3Pro(),HttpStatus.OK);
    }
}
