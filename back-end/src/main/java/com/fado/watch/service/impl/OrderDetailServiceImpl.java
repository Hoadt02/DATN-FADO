package com.fado.watch.service.impl;

import com.fado.watch.dto.response.CartResponse;
import com.fado.watch.entity.*;
import com.fado.watch.exception.ResourceNotFoundException;
import com.fado.watch.repository.OrderDetailRepository;
import com.fado.watch.repository.OrderRepository;
import com.fado.watch.repository.ProductDetailRepository;
import com.fado.watch.repository.ProductPromotionalRepository;
import com.fado.watch.service.IOrderDetailService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderDetailServiceImpl implements IOrderDetailService {

    private final OrderDetailRepository orderDetailRepository;
    private final OrderRepository orderRepository;

    private final ProductDetailRepository productDetailRepository;

    public OrderDetailServiceImpl(OrderDetailRepository orderDetailRepository,
                                  OrderRepository orderRepository,
                                  ProductDetailRepository productDetailRepository) {
        this.orderDetailRepository = orderDetailRepository;
        this.orderRepository = orderRepository;
        this.productDetailRepository = productDetailRepository;
    }


//    @Override
//    public List<OrderDetail> getAll() {
//        return this.orderDetailRepository.findAll();
//    }

    @Override
    public List<OrderDetail> findAllDetailByCustomerId(Integer id) {
        return this.orderDetailRepository.findAllDetailByCustomerId(id);
    }

//    @Override
//    public List<OrderDetail> getAllOrderDetailInOrder(Integer id) {
//        return this.orderDetailRepository.findAllByOrderId(id);
//    }

    @Override
    public void save(CartResponse response) {
        Order order = this.orderRepository.findById(response.getOrderId()).orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy đối tượng này"));

        for (Cart x : response.getCartList()) {
            OrderDetail orderDetail = new OrderDetail();
            orderDetail.setOrder(order);
            orderDetail.setProductDetail(x.getProductDetail());
            orderDetail.setPrice(x.getPrice());
            orderDetail.setQuantity(x.getQuantity());
            this.orderDetailRepository.save(orderDetail);

            ProductDetail productDetail = this.productDetailRepository.findById(x.getProductDetail().getId()).get();
            productDetail.setQuantity(productDetail.getQuantity() - x.getQuantity());
            this.productDetailRepository.save(productDetail);
        }
    }

    @Override
    public void delete(Integer id) {
        orderDetailRepository.deleteById(id);
    }
}
