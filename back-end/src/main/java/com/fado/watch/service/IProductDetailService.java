package com.fado.watch.service;

import com.fado.watch.entity.ProductDetail;

import java.util.List;

public interface IProductDetailService {
    List<ProductDetail> getAll();

    ProductDetail findProductDetails(Integer id);

    ProductDetail create(ProductDetail productDetail);

    ProductDetail update(ProductDetail productDetail);

    List<ProductDetail> getProductDetailByFilter(Integer[] category_id, Integer[] brand_id, Integer[] material_id, Integer[] origin_id, Boolean[] gender, Integer startPrice, Integer endPrice);

    List<ProductDetail> getSimilarProduct(Integer id);
}
