package com.fado.watch.service.impl;

import com.fado.watch.entity.Brand;
import com.fado.watch.exception.UniqueException;
import com.fado.watch.repository.BrandRepository;
import com.fado.watch.service.IBrandService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BrandServiceImpl implements IBrandService {
    @Autowired
    BrandRepository brandRepository;

    @Override
    public List<Brand> getAll() {
        return brandRepository.findAll();
    }

    @Override
    public Brand findById(Integer id) {
        return brandRepository.findById(id).get();
    }

    @Override
    public Brand create(Brand brand) {
        if (this.brandRepository.findByName(brand.getName()).isPresent()) {
            throw new UniqueException("Tên thương hiệu này đã tồn tại !");
        }
        return brandRepository.save(brand);
    }

    @Override
    public Brand update(Brand brand) {
        if (this.brandRepository.findByName(brand.getName()).isPresent()) {
            throw new UniqueException("Tên thương hiệu này đã tồn tại !");
        }
        return brandRepository.save(brand);
    }
}
