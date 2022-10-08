package com.fado.watch.service.impl;

import com.fado.watch.entity.Material;
import com.fado.watch.entity.Staff;
import com.fado.watch.exception.UniqueException;
import com.fado.watch.repository.MaterialRepository;
import com.fado.watch.service.IMaterialService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

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
        return materialRepository.findById(id).get();
    }

    @Override
    public Material create(Material material) {
        if (this.materialRepository.findByName(material.getName()).isPresent()) {
            throw new UniqueException("Tên chất liệu này đã tồn tại !");
        }
        return materialRepository.save(material);
    }

    @Override
    public Material update(Material material) {
        Material materialBefore = this.materialRepository.findById(material.getId()).get();

        if (this.materialRepository.findByName(material.getName()).isPresent() && !Objects.equals(material.getName(), materialBefore.getName())) {
            throw new UniqueException("Tên thương hiệu này đã tồn tại !");
        }
        return materialRepository.save(material);
    }
}
