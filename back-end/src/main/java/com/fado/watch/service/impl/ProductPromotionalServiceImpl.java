package com.fado.watch.service.impl;


import com.fado.watch.entity.ProductDetail;
import com.fado.watch.entity.ProductPromotional;
import com.fado.watch.exception.ResourceNotFoundException;
import com.fado.watch.repository.ProductPromotionalRepository;
import com.fado.watch.service.IProductPromotionalService;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Arrays;
import java.util.List;

@Service
@Transactional
public class ProductPromotionalServiceImpl implements IProductPromotionalService {

    private final ProductPromotionalRepository productPromotionalRepository;

    public ProductPromotionalServiceImpl(ProductPromotionalRepository productPromotionalRepository) {
        this.productPromotionalRepository = productPromotionalRepository;
    }

    @Override
    public List<ProductPromotional> getAll() {
        return this.productPromotionalRepository.findAll();
    }

    @Override
    public List<ProductDetail> getProductNotInPromotional() {
        return this.productPromotionalRepository.getProductNotInPromotional();
    }

    @Override
    public List<ProductPromotional> findAllProductPromotionalInCart(Integer idCtm) {
        return this.productPromotionalRepository.findAllProductPromotionalInCart(idCtm);
    }

    @Override
    public ProductPromotional getById(Integer id) {
        return this.productPromotionalRepository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException("Không tìm thấy sản phẩm này trong khuyến mại!")
        );
    }

    @Override
    public ProductPromotional[] create(ProductPromotional[] promotional) {
        this.productPromotionalRepository.saveAll(Arrays.asList(promotional));
        return promotional;

    }

    @Override
    public ProductPromotional[] update(ProductPromotional[] promotional) {
        this.productPromotionalRepository.saveAll(Arrays.asList(promotional));
        return promotional;
    }

    @Override
    public void delete(List<Integer> id) {
        this.productPromotionalRepository.deleteAllById(id);
    }

    @Override
    public List<ProductPromotional> getPromotional(Integer idOrder) {
        return productPromotionalRepository.getPromotional(idOrder);
    }
}
