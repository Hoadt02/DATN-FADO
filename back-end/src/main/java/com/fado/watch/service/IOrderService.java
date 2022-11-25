package com.fado.watch.service;

import com.fado.watch.dto.response.CharBarDTO;
import com.fado.watch.dto.response.OrderCancelDTO;
import com.fado.watch.dto.response.TotalOrderDTO;
import com.fado.watch.entity.Order;

import java.util.Date;
import java.util.List;

public interface IOrderService {

    List<Order> getAll();

    List<Order> findAllByCustomerId(Integer id);

    Order save(Order order);

    void delete(Integer id);

    void updateStatus(Integer status, Integer id);

    List<CharBarDTO> getChartBar();

    Integer getTotalRevenue();

    List<TotalOrderDTO> getTotalOrder();
    List<OrderCancelDTO> getOrderCancel();
    Integer getTotalOneDay();

}
