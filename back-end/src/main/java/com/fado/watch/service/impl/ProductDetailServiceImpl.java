package com.fado.watch.service.impl;

import com.fado.watch.entity.ProductDetail;
import com.fado.watch.exception.ResourceNotFoundException;
import com.fado.watch.repository.ProductDetailRepository;
import com.fado.watch.service.IProductDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Random;

@Service
public class ProductDetailServiceImpl implements IProductDetailService {
    @Autowired
    ProductDetailRepository repository;

    @Override
    public List<ProductDetail> getAll() {
        return repository.findAll();
    }

    @Override
    public ProductDetail findProductDetails(Integer id) {
        return repository.findById(id).orElseThrow(()->
                new ResourceNotFoundException("Không tìm thấy sản phẩm bạn mong muốn trong Database!")
        );
    }

    @Override
    public ProductDetail create(ProductDetail productDetail) {
        Random random = new Random();
        Long number = Math.abs(random.nextLong());
        for (int i = 0; i < getAll().size(); i++) {
            if (getAll().get(i).getImei().equals(number.toString().substring(0,15))){
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
}
