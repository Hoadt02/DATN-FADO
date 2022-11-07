package com.fado.watch.service.impl;

import com.fado.watch.dto.response.CartPriceResponse;
import com.fado.watch.dto.request.CartRequest;
import com.fado.watch.entity.*;
import com.fado.watch.exception.ResourceNotFoundException;
import com.fado.watch.repository.OrderDetailRepository;
import com.fado.watch.repository.OrderRepository;
import com.fado.watch.repository.ProductDetailRepository;
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

    @Override
    public List<OrderDetail> getAll() {
        return this.orderDetailRepository.findAll();
    }

    @Override
    public List<OrderDetail> findAllDetailByCustomerId(Integer id) {
        return this.orderDetailRepository.findAllDetailByCustomerId(id);
    }

    @Override
    public List<OrderDetail> getAllOrderDetailInOrder(Integer id) {
        return this.orderDetailRepository.findAllByOrderId(id);
    }

    @Override
    public void save(CartRequest response) {
        Order order = this.orderRepository.findById(response.getOrderId()).orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy đối tượng này"));

        for (CartPriceResponse x : response.getCartList()) {
            OrderDetail orderDetail = new OrderDetail();
            System.out.println(x.getPrice());
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


    // Day la` pha`n toi nha' ba.n hien da.u da.u
    @Override
    public OrderDetail saveOrderDetail(OrderDetail orderDetail) {
        OrderDetail orderDetailNew = this.orderDetailRepository.checkTrungSP(orderDetail.getProductDetail().getId(), orderDetail.getOrder().getId());
        if (orderDetailNew == null) {
            orderDetailNew = new OrderDetail();
            orderDetailNew.setProductDetail(orderDetail.getProductDetail());
            orderDetailNew.setOrder(orderDetail.getOrder());
            orderDetailNew.setQuantity(orderDetail.getQuantity());
            orderDetailNew.setPrice(orderDetail.getPrice());
        } else {
            orderDetailNew.setQuantity(orderDetailNew.getQuantity() + orderDetail.getQuantity());
        }

        return this.orderDetailRepository.save(orderDetailNew);
    }

    @Override
    public OrderDetail updateQuantityOrderDetail(OrderDetail orderDetail) {
        OrderDetail orderDetailNew = this.orderDetailRepository.checkTrungSP(orderDetail.getProductDetail().getId(), orderDetail.getOrder().getId());
        orderDetailNew.setQuantity(orderDetail.getQuantity());
        return this.orderDetailRepository.save(orderDetailNew);
    }

    @Override
    public void delete(Integer id) {
        orderDetailRepository.deleteById(id);
    }

    @Override
    public List<OrderDetail> findOrderDetailByOrder(Integer id) {
        return this.orderDetailRepository.findOrderDetailByOrder(id);
    }
}
