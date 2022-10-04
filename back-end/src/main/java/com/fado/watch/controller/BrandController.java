package com.fado.watch.controller;

import com.fado.watch.entity.Brand;
import com.fado.watch.entity.Category;
import com.fado.watch.entity.Origin;
import com.fado.watch.service.IBrandService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/v1/brand")
public class BrandController {

    private final IBrandService iBrandService;

    public BrandController(IBrandService iBrandService) {
        this.iBrandService = iBrandService;
    }

    @GetMapping
    public ResponseEntity<List<Brand>> findAll() {
        return new ResponseEntity<>(this.iBrandService.getAll(), HttpStatus.OK);
    }

    @GetMapping("{id}")
    public ResponseEntity<Brand> findById(@PathVariable("id") Integer id) {
        return new ResponseEntity<>(this.iBrandService.findById(id), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Brand> create(@RequestBody Brand brand) {
        return new ResponseEntity<>(this.iBrandService.create(brand), HttpStatus.OK);
    }

    @PutMapping("{id}")
    public ResponseEntity<Brand> update(@RequestBody Brand brand) {
        return new ResponseEntity<>(this.iBrandService.update(brand), HttpStatus.OK);
    }
}
