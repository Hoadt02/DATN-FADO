package com.fado.watch.service;

import com.fado.watch.entity.Material;

import java.util.List;

public interface IMaterialService {

    List<Material> getAll();

    Material findById(Integer id);

    Material create(Material staff);

    Material update(Material staff);

}
