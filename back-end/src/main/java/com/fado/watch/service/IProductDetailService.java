package com.fado.watch.service;

import com.fado.watch.entity.ProductDetail;

import java.util.List;

public interface IProductDetailService {
    List<ProductDetail> getAll();

    ProductDetail findProductDetails(Integer id);

    ProductDetail create(ProductDetail productDetail);

    ProductDetail update(ProductDetail productDetail);
}
