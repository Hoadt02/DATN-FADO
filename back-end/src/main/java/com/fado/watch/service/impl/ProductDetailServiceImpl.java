package com.fado.watch.service.impl;

import com.fado.watch.entity.Product;
import com.fado.watch.entity.ProductDetail;
import com.fado.watch.exception.ResourceNotFoundException;
import com.fado.watch.repository.*;
import com.fado.watch.service.IProductDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
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
                new ResourceNotFoundException("Không tìm thấy sản phẩm bạn mong muốn trong Database!")
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
    public Page<ProductDetail> findProductsWithPaginationAndSortingAndFilter(Integer page, Integer size, Integer sort,
                                                                    Integer[] category_id, Integer[] brand_id,
                                                                    Integer[] material_id, Integer[] origin_id,
                                                                    Boolean[] gender, Integer startPrice, Integer endPrice) {
        if (category_id.length < 1 && brand_id.length < 1 && material_id.length < 1 && origin_id.length < 1) {
            category_id = categoryRepository.getAllIdCategory();
            brand_id = brandRepository.getAllIdBrand();
            material_id = materialRepository.getAllIdMaterial();
            origin_id = originRepository.getAllIdOrigin();
        }
        if (gender.length < 1) gender = new Boolean[]{true, false};
        if (startPrice == null && endPrice == null) {
            List<ProductDetail> productDetails = getAll();
            Integer max = productDetails.get(0).getPrice();
            for (ProductDetail productDetail : productDetails) {
                if (max < productDetail.getPrice()) {
                    max = productDetail.getPrice();
                }
            }
            startPrice = 0;
            endPrice = max;
        }

        Page<ProductDetail> productDetails;
        if (sort == 1) {
            productDetails = repository.findAll(PageRequest.of(page, size, Sort.by("price").ascending()),
                    category_id, brand_id, material_id, origin_id, gender, startPrice, endPrice);
        } else if (sort == 2){
            productDetails = repository.findAll(PageRequest.of(page, size, Sort.by("price").descending()),
                    category_id, brand_id, material_id, origin_id, gender, startPrice, endPrice);
        }else {
            productDetails = repository.findAll(PageRequest.of(page, size),
                    category_id, brand_id, material_id, origin_id, gender, startPrice, endPrice);
        }
        return productDetails;
    }
}
