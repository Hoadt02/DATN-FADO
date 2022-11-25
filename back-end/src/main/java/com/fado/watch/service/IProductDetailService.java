package com.fado.watch.service;

import com.fado.watch.dto.request.FilterAndPagingAndSortingModel;
import com.fado.watch.dto.request.FilterModel;
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

    List<ProductDetail> getlistTop3Pro();
    Page<ProductDetail> findProductsWithPaginationAndSortingAndFilter(FilterAndPagingAndSortingModel model);

    List<ProductDetail> findProductWithFilter(FilterModel filterModel);

    Integer getCountProductByCategory(Integer id);

    Integer getCountProductByBrand(Integer id);

    Integer getCountProductByMaterial(Integer id);

    Integer getCountProductByOrigin(Integer id);

    Integer getCountProductByMale();

    Integer getCountProductByFemale();

    List<ProductDetail> getLatestProductDetail();

    List<ProductDetail> getProductDetailInPromotional();
    
    ProductDetail getProductDetailByImei(String imei);

    List<ProductDetail> getFeaturedProductDetail();
}
