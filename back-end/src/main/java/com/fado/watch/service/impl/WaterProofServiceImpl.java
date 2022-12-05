package com.fado.watch.service.impl;

import com.fado.watch.entity.WaterProof;
import com.fado.watch.entity.WaterProof;
import com.fado.watch.exception.UniqueException;
import com.fado.watch.repository.WaterProofRepository;
import com.fado.watch.service.IWaterProofService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
public class WaterProofServiceImpl implements IWaterProofService {
    @Autowired
    WaterProofRepository repository;

    @Override
    public List<WaterProof> getAll() {
        return repository.findAll();
    }

    @Override
    public WaterProof create(WaterProof waterProof) {
        if (this.repository.findByName(waterProof.getName()).isPresent()){
            throw new UniqueException("Tên loại chống nước đã tồn tại");
        }
        return this.repository.save(waterProof);
    }

    @Override
    public WaterProof update(WaterProof waterProof) {
        WaterProof waterProofBefore = this.repository.findById(waterProof.getId()).get();

        if (this.repository.findByName(waterProof.getName()).isPresent()
        && !Objects.equals(waterProof.getName(),waterProofBefore.getName())){
            throw new UniqueException("Tên loại chống nước đã tồn tại");
        }
        return this.repository.save(waterProof);
    }
}
