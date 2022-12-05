package com.fado.watch.service.impl;

import com.fado.watch.entity.FaceDiameter;
import com.fado.watch.entity.FaceDiameter;
import com.fado.watch.exception.UniqueException;
import com.fado.watch.repository.FaceDiameterRepository;
import com.fado.watch.repository.WaterProofRepository;
import com.fado.watch.service.IFaceDiameterService;
import com.fado.watch.service.IWaterProofService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
public class FaceDiameterServiceImpl implements IFaceDiameterService {
    @Autowired
    FaceDiameterRepository repository;

    @Override
    public List<FaceDiameter> getAll() {
        return repository.findAll();
    }

    @Override
    public FaceDiameter create(FaceDiameter faceDiameter) {
        if (this.repository.findByName(faceDiameter.getName()).isPresent()){
            throw new UniqueException("Tên mặt kính đã tồn tại");
        }
        return this.repository.save(faceDiameter);
    }

    @Override
    public FaceDiameter update(FaceDiameter faceDiameter) {
        FaceDiameter faceDiameterBefore = this.repository.findById(faceDiameter.getId()).get();

        if (this.repository.findByName(faceDiameter.getName()).isPresent()
        && !Objects.equals(faceDiameter.getName(),faceDiameterBefore.getName())){
            throw new UniqueException("Tên mặt kính đã tồn tại");
        }
        return this.repository.save(faceDiameter);
    }
}
