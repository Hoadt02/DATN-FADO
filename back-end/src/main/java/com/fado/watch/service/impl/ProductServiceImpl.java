package com.fado.watch.service.impl;

import com.fado.watch.entity.Product;
import com.fado.watch.repository.ProductRepository;
import com.fado.watch.service.IProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductServiceImpl implements IProductService {
    @Autowired
    ProductRepository repository;

    @Override
    public List<Product> getAll() {
        return repository.findAll();
    }
}
