package com.fado.watch.controller;

import com.fado.watch.entity.BatteryPowers;
import com.fado.watch.entity.Origin;
import com.fado.watch.service.IBatteryPowerService;
import com.fado.watch.service.IOriginService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/v1/battery-powers")
public class BatteryPowersController {
    private final IBatteryPowerService iBatteryPower;

    public BatteryPowersController(IBatteryPowerService iBatteryPower) {

        this.iBatteryPower = iBatteryPower;
    }

    @GetMapping
    public ResponseEntity<List<BatteryPowers>> findAll() {
        return new ResponseEntity<>(this.iBatteryPower.getAll(), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<BatteryPowers> create(@RequestBody BatteryPowers batteryPower){
        return new ResponseEntity<>(this.iBatteryPower.create(batteryPower), HttpStatus.OK);
    }

    @PutMapping("{id}")
    public ResponseEntity<BatteryPowers> update(@RequestBody BatteryPowers batteryPower){
        return new ResponseEntity<>(this.iBatteryPower.update(batteryPower), HttpStatus.OK);
    }
}
