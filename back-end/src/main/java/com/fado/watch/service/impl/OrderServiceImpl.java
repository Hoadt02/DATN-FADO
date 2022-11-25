package com.fado.watch.service.impl;

import com.fado.watch.dto.response.CharBarDTO;
import com.fado.watch.dto.response.OrderCancelDTO;
import com.fado.watch.dto.response.TotalOrderDTO;
import com.fado.watch.entity.Order;
import com.fado.watch.entity.OrderDetail;
import com.fado.watch.repository.OrderRepository;
import com.fado.watch.service.IOrderDetailService;
import com.fado.watch.service.IOrderService;
import com.fado.watch.service.IProductDetailService;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.Year;
import java.util.Date;
import java.util.List;

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

//    @Override
//    public void delete(Integer id) {
//        orderRepository.deleteById(id);
//    }

    public void updateStatus(Integer status, Integer id) {
        if (4 == status) {
            List<OrderDetail> orderDetails = this.orderDetailService.getAllOrderDetailInOrder(id);
            for (OrderDetail o : orderDetails) {
                o.getProductDetail().setQuantity(o.getQuantity() + o.getProductDetail().getQuantity());
                this.productDetailService.update(o.getProductDetail());
            }
        }
        this.orderRepository.updateStatus(status, id);
    }

    @Override
    public List<CharBarDTO> getChartBar() {
        return this.orderRepository.chartBar();
    }

    @Override
    public Integer getTotalRevenue() {
        return this.orderRepository.totalRevenue(Year.now().getValue());
    }

    @Override
    public List<TotalOrderDTO> getTotalOrder() {
        return this.orderRepository.totalOrder();
    }

    @Override
    public List<OrderCancelDTO> getOrderCancel() {
        return this.orderRepository.orderCancel();
    }

    @Override
    public Integer getTotalOneDay() { return this.orderRepository.totalOneDay(); }




    // Day la` pha`n toi nha' ba.n hien da.u da.u
    @Override
    public List<Order> getOrderByStaff(Integer id) {
        return this.orderRepository.getOrderByStaff(id);
    }

    @Override
    public Order update(Order order) {
        return orderRepository.save(order);
    }

    @Override
    public List<Order> getOrderById(Integer id) {
        return orderRepository.getOrderById(id);
    }

    @Override
    public List<Order> getOrderHistory(Integer id, Integer status) {
        return orderRepository.getOrderHistory(id, status);
    }
}
