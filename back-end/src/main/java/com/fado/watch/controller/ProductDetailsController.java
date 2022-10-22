package com.fado.watch.controller;

import com.fado.watch.dto.request.FilterModel;
import com.fado.watch.entity.ProductDetail;
import com.fado.watch.service.IProductDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
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
//    @PostMapping("/filter")
//    public ResponseEntity<List<ProductDetail>> getProductDetailByFilter(@RequestBody FilterModel filterModel){
//        System.out.println("Danh mục: " + Arrays.toString(filterModel.getCategory_id()));
//        System.out.println("Thương hiệu: " + Arrays.toString(filterModel.getBrand_id()));
//        System.out.println("Chất liệu: " + Arrays.toString(filterModel.getMaterial_id()));
//        System.out.println("Xuất xứ: " + Arrays.toString(filterModel.getOrigin_id()));
//        System.out.println("Giới tính: " + Arrays.toString(filterModel.getGender()));
//        System.out.println("Giá bắt đầu: " + filterModel.getStartPrice());
//        System.out.println("Giá bắt đầu: " + filterModel.getEndPrice());
//
//        return new ResponseEntity<>(this.service.getProductDetailByFilter(filterModel), HttpStatus.OK);
////        return null;
//    }

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
}
