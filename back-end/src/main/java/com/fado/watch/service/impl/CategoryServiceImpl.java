package com.fado.watch.service.impl;

import com.fado.watch.entity.Category;

import com.fado.watch.exception.UniqueException;
import com.fado.watch.repository.CategoryRepository;
import com.fado.watch.service.ICategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryServiceImpl implements ICategoryService {
    @Autowired
    CategoryRepository categoryRepository;

    @Override
    public List<Category> getAll() {
        return categoryRepository.findAll();
    }

    @Override
    public Category findById(Integer id) {
        return categoryRepository.findById(id).get();
    }

    @Override
    public Category create(Category category) {
        if (this.categoryRepository.findByName(category.getName()).isPresent()) {
            throw new UniqueException("Tên danh mục này đã tồn tại !");
        }
        return categoryRepository.save(category);
    }

    @Override
    public Category update(Category category) {
        if (this.categoryRepository.findByName(category.getName()).isPresent()) {
            throw new UniqueException("Tên danh mục này đã tồn tại !");
        }
        return categoryRepository.save(category);
    }
}
