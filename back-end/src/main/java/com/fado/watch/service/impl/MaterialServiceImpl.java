package com.fado.watch.service.impl;

import com.fado.watch.entity.Material;
import com.fado.watch.repository.MaterialRepository;
import com.fado.watch.service.IMaterialService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MaterialServiceImpl implements IMaterialService {

    @Autowired
    MaterialRepository materialRepository;

    @Override
    public List<Material> getAll() {
        return materialRepository.findAll();
    }

    @Override
    public Material findById(Integer id) {
        return null;
    }

    @Override
    public Material create(Material staff) {
        return null;
    }

    @Override
    public Material update(Material staff) {
        return null;
    }
}
