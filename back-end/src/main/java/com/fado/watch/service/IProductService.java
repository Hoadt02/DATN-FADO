package com.fado.watch.service;

import com.fado.watch.entity.Brand;
import com.fado.watch.entity.Product;

import java.util.List;

public interface IProductService {
    List<Product> getAll();

    Product findById(Integer id);

    Product create(Product product);

    Product update(Product product);
}
