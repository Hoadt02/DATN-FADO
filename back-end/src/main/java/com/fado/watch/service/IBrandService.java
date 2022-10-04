package com.fado.watch.service;

import com.fado.watch.entity.Brand;

import java.util.List;

public interface IBrandService {
    List<Brand> getAll();

    Brand findById(Integer id);

    Brand create(Brand brand);

    Brand update(Brand brand);
}
