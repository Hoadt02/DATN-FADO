package com.fado.watch.service;

import com.fado.watch.entity.Order;

import java.util.List;

public interface IOrderService {

    List<Order> getAll();

    List<Order> findAllByCustomerId(Integer id);

    Order save(Order order);

    void updateStatus(Integer status, Integer id);

}
