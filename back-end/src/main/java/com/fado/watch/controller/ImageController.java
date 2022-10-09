package com.fado.watch.controller;

import com.fado.watch.entity.Image;
import com.fado.watch.entity.ProductDetail;
import com.fado.watch.service.IImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/v1/image")
public class ImageController {

    @Autowired
    IImageService service;

    @GetMapping("{id}")
    public ResponseEntity<List<Image>> getImagesByIdProductDetail(@PathVariable("id") Integer id){
        return new ResponseEntity<>(this.service.getImagesByIdProductDetail(id), HttpStatus.OK);
    }

    @PostMapping()
    public ResponseEntity<Image> create(@RequestBody Image image){
        return new ResponseEntity<>(this.service.create(image), HttpStatus.OK);
    }

    @DeleteMapping("{id}")
    public void delete(@PathVariable("id") Integer id){
        this.service.delete(id);
    }
}
