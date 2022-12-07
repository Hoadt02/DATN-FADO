package com.fado.watch.controller;

import com.fado.watch.entity.BatteryPowers;
import com.fado.watch.entity.FaceDiameter;
import com.fado.watch.entity.Material;
import com.fado.watch.service.IFaceDiameterService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/v1/face-diameter")
public class FaceDiameterController {
    private final IFaceDiameterService iFaceDiameter;

    public FaceDiameterController(IFaceDiameterService iFaceDiameter) {
        this.iFaceDiameter = iFaceDiameter;
    }

    @GetMapping
    public ResponseEntity<List<FaceDiameter>> findAll() {
        return new ResponseEntity<>(this.iFaceDiameter.getAll(), HttpStatus.OK);
    }
    @GetMapping("{id}")
    public ResponseEntity<FaceDiameter> findById(@PathVariable("id") Integer id) {
        return new ResponseEntity<>(this.iFaceDiameter.findById(id), HttpStatus.OK);
    }
    @PostMapping
    public ResponseEntity<FaceDiameter> create(@RequestBody FaceDiameter batteryPower){
        return new ResponseEntity<>(this.iFaceDiameter.create(batteryPower), HttpStatus.OK);
    }

    @PutMapping("{id}")
    public ResponseEntity<FaceDiameter> update(@RequestBody FaceDiameter batteryPower){
        return new ResponseEntity<>(this.iFaceDiameter.update(batteryPower), HttpStatus.OK);
    }
}
