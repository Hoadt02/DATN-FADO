package com.fado.watch.service.impl;

import com.fado.watch.entity.Order;
import com.fado.watch.repository.OrderRepository;
import com.fado.watch.service.IOrderService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderServiceImpl implements IOrderService {

    private final OrderRepository orderRepository;

    public OrderServiceImpl(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
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

}
