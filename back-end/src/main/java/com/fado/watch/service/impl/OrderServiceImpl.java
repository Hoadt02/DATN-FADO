package com.fado.watch.service.impl;

import com.fado.watch.entity.Order;
import com.fado.watch.entity.OrderDetail;
import com.fado.watch.entity.ProductDetail;
import com.fado.watch.repository.OrderRepository;
import com.fado.watch.service.IOrderDetailService;
import com.fado.watch.service.IOrderService;
import com.fado.watch.service.IProductDetailService;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Objects;

@Service
@Transactional
public class OrderServiceImpl implements IOrderService {

    private final IOrderDetailService orderDetailService;

    private final OrderRepository orderRepository;

    private final IProductDetailService productDetailService;

    public OrderServiceImpl(IOrderDetailService orderDetailService, OrderRepository orderRepository, IProductDetailService productDetailService) {
        this.orderDetailService = orderDetailService;
        this.orderRepository = orderRepository;
        this.productDetailService = productDetailService;
    }

    @Override
    public List<Order> getAll() {
        return this.orderRepository.findAll();
    }

    @Override
    public List<Order> findAllByCustomerId(Integer id) {
        return this.orderRepository.findAllByCustomerId(id);
    }

    @Override
    public Order save(Order order) {
        return this.orderRepository.save(order);
    }

    @Override
    public void delete(Integer id) {
        orderRepository.deleteById(id);
    }

    public void updateStatus(Integer status, Integer id) {
        if (4 == status) {
            List<OrderDetail> orderDetails = this.orderDetailService.getAllOrderDetailInOrder(id);
            for (OrderDetail o : orderDetails) {
                o.getProductDetail().setQuantity(o.getQuantity() + o.getProductDetail().getQuantity());
                this.productDetailService.update(o.getProductDetail());
                break;
            }
        }
        this.orderRepository.updateStatus(status, id);
    }

}
