package com.fado.watch.controller;

import com.fado.watch.entity.Category;
import com.fado.watch.service.ICategoryService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/v1/category")
public class CategoryController {

    private final ICategoryService iCategoryService;

    public CategoryController(ICategoryService iCategoryService) {
        this.iCategoryService = iCategoryService;
    }

    @GetMapping
    public ResponseEntity<List<Category>> findAll() {
        return new ResponseEntity<>(this.iCategoryService.getAll(), HttpStatus.OK);
    }

    @GetMapping("{id}")
    public ResponseEntity<Category> findById(@PathVariable("id") Integer id) {
        return new ResponseEntity<>(this.iCategoryService.findById(id), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Category> create(@RequestBody Category category) {
        return new ResponseEntity<>(this.iCategoryService.create(category), HttpStatus.OK);
    }

    @PutMapping("{id}")
    public ResponseEntity<Category> update(@RequestBody Category category) {
        return new ResponseEntity<>(this.iCategoryService.update(category), HttpStatus.OK);
    }
}
