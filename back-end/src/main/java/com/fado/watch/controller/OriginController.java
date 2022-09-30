package com.fado.watch.controller;

import com.fado.watch.entity.Origin;
import com.fado.watch.service.IOriginService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/v1/origin")
public class OriginController {
    private final IOriginService iOriginService;

    public OriginController(IOriginService iOriginService) {
        this.iOriginService = iOriginService;
    }

    @GetMapping
    public ResponseEntity<List<Origin>> findAll() {
        return new ResponseEntity<>(this.iOriginService.getAll(), HttpStatus.OK);
    }
}
