package com.fado.watch.service;

import com.fado.watch.entity.Order;
import org.aspectj.weaver.ast.Or;

import java.util.List;

public interface IOrderService {

    List<Order> getAll();

    List<Order> findAllByCustomerId(Integer id);

    Order save(Order order);

//    void delete(Integer id);

    void updateStatus(Integer status, Integer id);

    // Day la` pha`n toi nha' ba.n hien da.u da.u
    List<Order> getOrderByStaff(Integer id);

    Order update(Order order);

    List<Order> getOrderById(Integer id);

    List<Order> getOrderHistory(Integer id, Integer status);
}
