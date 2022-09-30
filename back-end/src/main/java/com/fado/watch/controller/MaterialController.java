package com.fado.watch.controller;

import com.fado.watch.entity.Material;
import com.fado.watch.service.IMaterialService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/material")
public class MaterialController {

    private final IMaterialService iMaterialService;

    public MaterialController(IMaterialService iMaterialService) {
        this.iMaterialService = iMaterialService;
    }

    @GetMapping
    public ResponseEntity<List<Material>> findAll() {
        return new ResponseEntity<>(this.iMaterialService.getAll(), HttpStatus.OK);
    }
}
