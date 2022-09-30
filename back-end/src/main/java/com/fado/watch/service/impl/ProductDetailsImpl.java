package com.fado.watch.service.impl;

import com.fado.watch.entity.ProductDetail;
import com.fado.watch.repository.ProductDetailRepository;
import com.fado.watch.service.IProductDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductDetailsImpl implements IProductDetails {
    @Autowired
    ProductDetailRepository repository;

    @Override
    public List<ProductDetail> getAll() {
        return null;
    }

    @Override
    public ProductDetail findProductDetails(Integer id) {
        return null;
    }

    @Override
    public ProductDetail create(ProductDetail productDetail) {
        return null;
    }

    @Override
    public ProductDetail update(ProductDetail productDetail) {
        return null;
    }

    @Override
    public ProductDetail delete(ProductDetail productDetail) {
        return null;
    }
}
