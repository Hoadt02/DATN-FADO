package com.fado.watch.controller;


import com.fado.watch.dto.request.FilterPromotional;
import com.fado.watch.entity.Promotional;
import com.fado.watch.service.IPromotionalService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("api/v1/promotional")
public class PromotionalController {

    private final IPromotionalService iPromotionalService;

    public PromotionalController(IPromotionalService iPromotionalService) {
        this.iPromotionalService = iPromotionalService;
    }

    @GetMapping
    public ResponseEntity<List<Promotional>> getAll() {
        return ResponseEntity.ok(this.iPromotionalService.getAll());
    }

    @GetMapping("findAllByStatusTrue")
    public ResponseEntity<List<Promotional>> findAllByStatusTrue() {
        return ResponseEntity.ok(this.iPromotionalService.findAllByStatusTrue());
    }

    @GetMapping("{id}")
    public ResponseEntity<Promotional> getById(@PathVariable("id") Integer id) {
        return ResponseEntity.ok(this.iPromotionalService.getById(id));
    }

    @PostMapping
    public ResponseEntity<Promotional> create(@RequestBody Promotional promotional) {
        return ResponseEntity.ok(this.iPromotionalService.create(promotional));
    }

    @PutMapping("{id}")
    public ResponseEntity<Promotional> update(@RequestBody Promotional promotional) {
        return ResponseEntity.ok(this.iPromotionalService.update(promotional));
    }

    @PostMapping("/filter")
    public ResponseEntity<List<Promotional>> update(@RequestBody FilterPromotional rq) {
        return ResponseEntity.ok(this.iPromotionalService.filter(rq));
    }

}
