package com.fado.watch.service;

import com.fado.watch.entity.ProductDetail;
import org.springframework.data.domain.Page;

import java.util.List;

public interface IProductDetailService {
    List<ProductDetail> getAll();

    ProductDetail findProductDetails(Integer id);

    ProductDetail create(ProductDetail productDetail);

    ProductDetail update(ProductDetail productDetail);

    List<ProductDetail> getSimilarProduct(Integer id);

    List<ProductDetail> findProductByName(String name);

    List<ProductDetail> findAllProductInOrder(Integer id);

    Page<ProductDetail> findProductsWithPaginationAndSortingAndFilter(Integer page, Integer size, Integer sort,
                                                             Integer[] category_id, Integer[] brand_id,
                                                             Integer[] material_id, Integer[] origin_id,
                                                             Boolean[] gender, Integer startPrice, Integer endPrice);
}
