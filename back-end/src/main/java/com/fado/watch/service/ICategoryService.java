package com.fado.watch.service;

import com.fado.watch.entity.Category;

import java.util.List;

public interface ICategoryService {
    List<Category> getAll();

    Category findById(Integer id);

    Category create(Category category);

    Category update(Category category);
}
