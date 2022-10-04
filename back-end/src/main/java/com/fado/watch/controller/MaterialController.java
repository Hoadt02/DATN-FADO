package com.fado.watch.controller;

import com.fado.watch.entity.Brand;
import com.fado.watch.entity.Material;
import com.fado.watch.service.IMaterialService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/v1/material")
public class MaterialController {

    private final IMaterialService iMaterialService;

    public MaterialController(IMaterialService iMaterialService) {
        this.iMaterialService = iMaterialService;
    }

    @GetMapping
    public ResponseEntity<List<Material>> findAll() {
        return new ResponseEntity<>(this.iMaterialService.getAll(), HttpStatus.OK);
    }
    @GetMapping("{id}")
    public ResponseEntity<Material> findById(@PathVariable("id") Integer id) {
        return new ResponseEntity<>(this.iMaterialService.findById(id), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Material> create(@RequestBody Material material) {
        return new ResponseEntity<>(this.iMaterialService.create(material), HttpStatus.OK);
    }

    @PutMapping("{id}")
    public ResponseEntity<Material> update(@RequestBody Material material) {
        return new ResponseEntity<>(this.iMaterialService.update(material), HttpStatus.OK);
    }
}
