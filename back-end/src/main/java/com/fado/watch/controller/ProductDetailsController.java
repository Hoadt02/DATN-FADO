package com.fado.watch.controller;

import com.fado.watch.dto.request.FilterAndPagingAndSortingModel;
import com.fado.watch.dto.request.FilterModel;
import com.fado.watch.entity.ProductDetail;
import com.fado.watch.service.IProductDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
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

    @PostMapping("/findProductsWithPaginationAndSortingAndFilter")
    public ResponseEntity<Page<ProductDetail>> findProductsWithPaginationAndSortingAndFilter(@RequestBody FilterAndPagingAndSortingModel model) {
            return new ResponseEntity<>(this.service.findProductsWithPaginationAndSortingAndFilter(model), HttpStatus.OK);
    }

    @PostMapping("/findProductWithFilter")
    public ResponseEntity<List<ProductDetail>> findProductWithFilter(@RequestBody FilterModel filterModel){
        return new ResponseEntity<>(this.service.findProductWithFilter(filterModel), HttpStatus.OK);
    }

    @GetMapping("/getCountProductByCategory/{id}")
    public ResponseEntity<Integer> getCountProductByCategory(@PathVariable Integer id){
        return new ResponseEntity<>(this.service.getCountProductByCategory(id), HttpStatus.OK);
    }

    @GetMapping("/getCountProductByBrand/{id}")
    public ResponseEntity<Integer> getCountProductByBrand(@PathVariable Integer id){
        return new ResponseEntity<>(this.service.getCountProductByBrand(id), HttpStatus.OK);
    }

    @GetMapping("/getCountProductByMaterial/{id}")
    public ResponseEntity<Integer> getCountProductByMaterial(@PathVariable Integer id){
        return new ResponseEntity<>(this.service.getCountProductByMaterial(id), HttpStatus.OK);
    }

    @GetMapping("/getCountProductByOrigin/{id}")
    public ResponseEntity<Integer> getCountProductByOrigin(@PathVariable Integer id){
        return new ResponseEntity<>(this.service.getCountProductByOrigin(id), HttpStatus.OK);
    }

    @GetMapping("/getCountProductByMale")
    public ResponseEntity<Integer> getCountProductByMale(){
        return new ResponseEntity<>(this.service.getCountProductByMale(), HttpStatus.OK);
    }

    @GetMapping("/getCountProductByFemale")
    public ResponseEntity<Integer> getCountProductByFemale(){
        return new ResponseEntity<>(this.service.getCountProductByFemale(), HttpStatus.OK);
    }

    @GetMapping("/getLatestProductDetail")
    public ResponseEntity<List<ProductDetail>> getLatestProductDetail(){
        return new ResponseEntity<>(this.service.getLatestProductDetail(),HttpStatus.OK);
    }

    @GetMapping("/getProductDetailInPromotional")
    public ResponseEntity<List<ProductDetail>> getProductDetailInPromotional(){
        return new ResponseEntity<>(this.service.getProductDetailInPromotional(),HttpStatus.OK);
    }
}

