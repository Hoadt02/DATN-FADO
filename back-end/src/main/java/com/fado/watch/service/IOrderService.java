package com.fado.watch.service;

import com.fado.watch.entity.Order;

import java.util.List;

public interface IOrderService {

    List<Order> getAll();

    Order save(Order order);

}
