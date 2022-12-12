package com.fado.watch.service;

import com.fado.watch.dto.request.ChangeInfoOrder;
import com.fado.watch.dto.request.FilterOrder;
import com.fado.watch.dto.response.CharBarDTO;
import com.fado.watch.dto.response.OrderCancelDTO;
import com.fado.watch.dto.response.TopProductDTO;
import com.fado.watch.dto.response.TotalOrderDTO;
import com.fado.watch.entity.Order;
import org.aspectj.weaver.ast.Or;

import java.util.Date;
import java.util.List;

public interface IOrderService {

    List<Order> getAll();

    List<Order> findAllByCustomerId(Integer id);

    Order findById(Integer id);

    void changeInfoOrder(ChangeInfoOrder dto);

    Order save(Order order);

//    void delete(Integer id);

    void updateStatus(Integer status, Integer id);

    void revertOrder(String description, Integer id);

    List<CharBarDTO> getChartBar();

    Integer getTotalRevenue();

    List<TotalOrderDTO> getTotalOrder();

    List<OrderCancelDTO> getOrderCancel();

    Integer getTotalOneDay();

    // Day la` pha`n toi nha' ba.n hien da.u da.u
    List<Order> getOrderByStaff(Integer id);

    Order updateMua(Order order);

    Order updateHuy(Order order);

    List<Order> getOrderById(Integer id);

    List<Order> getOrderHistory(Integer id, Integer status);

    void exportOrder(Integer id);

    List<Order> filterOrder(FilterOrder filterOrder);

    List<Order> getListOrder(Integer idStaff);

    List<TopProductDTO> getListTop();

}
