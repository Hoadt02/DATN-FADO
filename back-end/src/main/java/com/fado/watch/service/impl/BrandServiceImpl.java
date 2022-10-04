package com.fado.watch.service.impl;

import com.fado.watch.entity.Brand;
import com.fado.watch.repository.BrandRepository;
import com.fado.watch.service.IBrandService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BrandServiceImpl implements IBrandService {
    @Autowired
    BrandRepository repository;

    @Override
    public List<Brand> getAll() {
        return repository.findAll();
    }

    @Override
    public Brand findById(Integer id) {
        return repository.findById(id).get();
    }

    @Override
    public Brand create(Brand brand) {
        return repository.save(brand);
    }

    @Override
    public Brand update(Brand brand) {
        return repository.save(brand);
    }
}
