package com.fado.watch.service;

import com.fado.watch.dto.response.CartResponse;
import com.fado.watch.entity.Order;
import com.fado.watch.entity.OrderDetail;

import java.util.List;

public interface IOrderDetailService {

    List<OrderDetail> getAll();

    List<OrderDetail> findAllDetailByCustomerId(Integer id);

    List<OrderDetail> getAllOrderDetailInOrder(Integer id);

    void save(CartResponse response);


    // Day la` pha`n toi nha' ba.n hien da.u da.u
    OrderDetail saveOrderDetail(OrderDetail orderDetail);

    OrderDetail updateQuantityOrderDetail(OrderDetail orderDetail);

    void delete(Integer id);

    List<OrderDetail> findOrderDetailByOrder(Integer id);
}
