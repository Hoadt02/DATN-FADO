package com.fado.watch.controller;

import com.fado.watch.entity.Origin;
import com.fado.watch.service.IOriginService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    @PostMapping
    public ResponseEntity<Origin> create(@RequestBody Origin origin){
        return new ResponseEntity<>(this.iOriginService.create(origin), HttpStatus.OK);
    }

    @PutMapping("{id}")
    public ResponseEntity<Origin> update(@RequestBody Origin origin){
        return new ResponseEntity<>(this.iOriginService.update(origin), HttpStatus.OK);
    }
}
