package com.fado.watch.controller;

import com.fado.watch.entity.FaceDiameter;
import com.fado.watch.entity.Material;
import com.fado.watch.entity.WaterProof;
import com.fado.watch.service.IFaceDiameterService;
import com.fado.watch.service.IWaterProofService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/v1/water-proof")
public class WaterProofController {
    private final IWaterProofService iWaterProof;

    public WaterProofController(IWaterProofService iWaterProof) {
        this.iWaterProof = iWaterProof;
    }

    @GetMapping
    public ResponseEntity<List<WaterProof>> findAll() {
        return new ResponseEntity<>(this.iWaterProof.getAll(), HttpStatus.OK);
    }
    @GetMapping("{id}")
    public ResponseEntity<WaterProof> findById(@PathVariable("id") Integer id) {
        return new ResponseEntity<>(this.iWaterProof.findById(id), HttpStatus.OK);
    }
    @PostMapping
    public ResponseEntity<WaterProof> create(@RequestBody WaterProof waterProof){
        return new ResponseEntity<>(this.iWaterProof.create(waterProof), HttpStatus.OK);
    }

    @PutMapping("{id}")
    public ResponseEntity<WaterProof> update(@RequestBody WaterProof waterProof){
        return new ResponseEntity<>(this.iWaterProof.update(waterProof), HttpStatus.OK);
    }
}
