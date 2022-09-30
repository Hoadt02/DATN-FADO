package com.fado.watch.service.impl;

import com.fado.watch.entity.Category;
import com.fado.watch.repository.CategoryRepository;
import com.fado.watch.service.ICategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryServiceImpl implements ICategoryService {
    @Autowired
    CategoryRepository repository;

    @Override
    public List<Category> getAll() {
        return repository.findAll();
    }
}
