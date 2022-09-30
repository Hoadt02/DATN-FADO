package com.fado.watch.controller;

import com.fado.watch.entity.Brand;
import com.fado.watch.entity.Origin;
import com.fado.watch.service.IBrandService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}
