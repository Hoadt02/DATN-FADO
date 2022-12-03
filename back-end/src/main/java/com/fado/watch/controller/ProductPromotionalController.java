package com.fado.watch.controller;


import com.fado.watch.dto.response.DeleteProductPromotional;
import com.fado.watch.entity.ProductDetail;
import com.fado.watch.entity.ProductPromotional;
import com.fado.watch.service.IProductPromotionalService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/v1/product-promotional")
public class ProductPromotionalController {

    private final IProductPromotionalService iProductPromotionalService;

    public ProductPromotionalController(IProductPromotionalService iProductPromotionalService) {
        this.iProductPromotionalService = iProductPromotionalService;
    }

    @GetMapping
    public ResponseEntity<List<ProductPromotional>> getAll() {
        return ResponseEntity.ok(this.iProductPromotionalService.getAll());
    }

    @GetMapping("/getProductNotInPromotional")
    public ResponseEntity<List<ProductDetail>> getProductNotInPromotional() {
        return ResponseEntity.ok(this.iProductPromotionalService.getProductNotInPromotional());
    }

    @GetMapping("/findAllProductPromotionalInCart/{idCtm}")
    public ResponseEntity<List<ProductPromotional>> findAllProductPromotionalInCart(@PathVariable("idCtm") Integer idCtm) {
        return ResponseEntity.ok(this.iProductPromotionalService.findAllProductPromotionalInCart(idCtm));
    }

    @GetMapping({"{id}"})
    public ResponseEntity<ProductPromotional> getById(@PathVariable("id") Integer id) {
        return ResponseEntity.ok(this.iProductPromotionalService.getById(id));
    }

    @PostMapping
    public ResponseEntity<ProductPromotional[]> create(@RequestBody ProductPromotional[] productPromotionals) {
        return ResponseEntity.ok(this.iProductPromotionalService.create(productPromotionals));
    }

    @PutMapping("{id}")
    public ResponseEntity<ProductPromotional[]> update(@RequestBody ProductPromotional[] productPromotionals) {
        return ResponseEntity.ok(this.iProductPromotionalService.update(productPromotionals));
    }

    @PostMapping("delete")
    public void delete(@RequestBody DeleteProductPromotional deleteProductPromotional) {
        this.iProductPromotionalService.delete(deleteProductPromotional.getId());
    }

    @PostMapping("/findProductPromotionalByIdProductDetail")
    public ResponseEntity<List<ProductPromotional>> findProductPromotionalByIdProductDetail(@RequestBody Integer[] id) {
        return ResponseEntity.ok(this.iProductPromotionalService.findProductPromotionalByIdProductDetail(id));
    }
    
    @GetMapping("/getPromotional")
    public ResponseEntity<List<ProductPromotional>> getPromotional(@RequestParam("idO") Integer idOder) {
        return ResponseEntity.ok(this.iProductPromotionalService.getPromotional(idOder));
    }

    @GetMapping("/getDiscount/{idPd}")
    public ResponseEntity<List<ProductPromotional>> getDiscount(@PathVariable("idPd") Integer idPb) {
        return new ResponseEntity<>(this.iProductPromotionalService.getDiscountProduct(idPb), HttpStatus.OK);
    }
}
