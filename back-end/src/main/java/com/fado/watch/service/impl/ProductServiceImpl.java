package com.fado.watch.service.impl;

import com.fado.watch.entity.Product;
import com.fado.watch.exception.UniqueException;
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

    @Override
    public Product findById(Integer id) {
        return repository.findById(id).get();
    }

    @Override
    public Product create(Product product) {
        if (this.repository.findByName(product.getName()).isPresent()) {
            throw new UniqueException("Dòng sản này đã tồn tại !");
        }
        return repository.save(product);
    }

    @Override
    public Product update(Product product) {
        return repository.save(product);
    }
}
