package com.fado.watch.service.impl;

import com.fado.watch.dto.request.FilterAndPagingAndSortingModel;
import com.fado.watch.dto.request.FilterModel;
import com.fado.watch.entity.ProductDetail;
import com.fado.watch.exception.ResourceNotFoundException;
import com.fado.watch.repository.*;
import com.fado.watch.service.IProductDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Random;

@Service
public class ProductDetailServiceImpl implements IProductDetailService {
    @Autowired
    ProductDetailRepository repository;

    @Autowired
    CategoryRepository categoryRepository;

    @Autowired
    BrandRepository brandRepository;

    @Autowired
    MaterialRepository materialRepository;

    @Autowired
    OriginRepository originRepository;

    // hiên///
    private final ProductDetailRepository productDetailRepository;

    public ProductDetailServiceImpl(ProductDetailRepository productDetailRepository) {
        this.productDetailRepository = productDetailRepository;
    }

    @Override
    public List<ProductDetail> getAll() {
        return repository.findAll();
    }

    @Override
    public ProductDetail findProductDetails(Integer id) {
        return repository.findById(id).orElseThrow(() ->
                new ResourceNotFoundException("Không tìm thấy sản phẩm bạn mong muốn!")
        );
    }

    @Override
    public ProductDetail create(ProductDetail productDetail) {
        Random random = new Random();
        Long number = Math.abs(random.nextLong());
        for (int i = 0; i < getAll().size(); i++) {
            if (getAll().get(i).getImei().equals(number.toString().substring(0, 15))) {
                number = Math.abs(random.nextLong());
            }
        }
        productDetail.setImei(number.toString());
        productDetail.setCreateDate(LocalDate.now());
        return repository.save(productDetail);
    }

    @Override
    public ProductDetail update(ProductDetail productDetail) {
        return repository.save(productDetail);
    }

    @Override
    public List<ProductDetail> getSimilarProduct(Integer id) {
        return repository.getSimilarProduct(id);
    }

    @Override
    public List<ProductDetail> findProductByName(String name) {
        return repository.getProductByName(name);
    }

    @Override
    public List<ProductDetail> findAllProductInOrder(Integer id) {
        return this.productDetailRepository.findAllProductInOrder(id);
    }

    @Override
    public List<ProductDetail> getlistTop3Pro() {
        return this.repository.getListTop3Pro();
    }
    public Page<ProductDetail> findProductsWithPaginationAndSortingAndFilter(FilterAndPagingAndSortingModel model) {
        if (model.getSearch() == null && model.getCategory_id().length < 1 && model.getBrand_id().length < 1
                && model.getMaterial_id().length < 1 && model.getOrigin_id().length < 1) {
            model.setCategory_id(categoryRepository.getAllIdCategory());
            model.setBrand_id(brandRepository.getAllIdBrand());
            model.setMaterial_id(materialRepository.getAllIdMaterial());
            model.setOrigin_id(originRepository.getAllIdOrigin());
        }
        if (model.getGender().length < 1) model.setGender(new Boolean[]{true, false});
        if (model.getStartPrice() == null && model.getEndPrice() == null) {
            List<ProductDetail> productDetails = getAll();
            Integer max = productDetails.get(0).getPrice();
            for (ProductDetail productDetail : productDetails) {
                if (max < productDetail.getPrice()) {
                    max = productDetail.getPrice();
                }
            }
            model.setStartPrice(0);
            model.setEndPrice(max);
        }

        Page<ProductDetail> productDetails;
        if (model.getSort() == 1) {
            productDetails = repository.findAll(PageRequest.of(model.getPage(), model.getSize(), Sort.by("id").descending()),
                    model.getSearch(), model.getCategory_id(), model.getBrand_id(), model.getMaterial_id(), model.getOrigin_id(),
                    model.getGender(), model.getStartPrice(), model.getEndPrice());
        } else if (model.getSort() == 2) {
            productDetails = repository.findAll(PageRequest.of(model.getPage(), model.getSize(), Sort.by("id").ascending()),
                    model.getSearch(), model.getCategory_id(), model.getBrand_id(), model.getMaterial_id(), model.getOrigin_id(),
                    model.getGender(), model.getStartPrice(), model.getEndPrice());
        } else {
            productDetails = repository.findAll(PageRequest.of(model.getPage(), model.getSize()),
                    model.getSearch(), model.getCategory_id(), model.getBrand_id(), model.getMaterial_id(), model.getOrigin_id(),
                    model.getGender(), model.getStartPrice(), model.getEndPrice());
        }

        return productDetails;
    }

    @Override
    public List<ProductDetail> findProductWithFilter(FilterModel filterModel) {
        return repository.findProductWithFilter(filterModel.getProduct_id(), filterModel.getBrand_id(),
                filterModel.getMaterial_id(), filterModel.getOrigin_id(), filterModel.getStatus(), filterModel.getGender());
    }

    @Override
    public Integer getCountProductByCategory(Integer id) {
        return repository.getCountProductByCategory(id);
    }

    @Override
    public Integer getCountProductByBrand(Integer id) {
        return repository.getCountProductByBrand(id);
    }

    @Override
    public Integer getCountProductByMaterial(Integer id) {
        return repository.getCountProductByMaterial(id);
    }

    @Override
    public Integer getCountProductByOrigin(Integer id) {
        return repository.getCountProductByOrigin(id);
    }

    @Override
    public Integer getCountProductByMale() {
        return repository.getCountProductByMale();
    }

    @Override
    public Integer getCountProductByFemale() {
        return repository.getCountProductByFemale();
    }

    @Override
    public List<ProductDetail> getLatestProductDetail() {
        return repository.getLatestProductDetail();
    }

    @Override
    public List<ProductDetail> getProductDetailInPromotional() {
        return repository.getProductDetailInPromotional();
    }

    public ProductDetail getProductDetailByImei(String imei) {
        return this.repository.getProductDetailByImei(imei);
    }

    @Override
    public List<ProductDetail> getFeaturedProductDetail() {
        return repository.getFeaturedProductDetail();
    }
}
