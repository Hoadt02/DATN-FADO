package com.fado.watch.repository;

import com.fado.watch.dto.response.CharBarDTO;
import com.fado.watch.dto.response.OrderCancelDTO;
import com.fado.watch.dto.response.TotalOrderDTO;
import com.fado.watch.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Integer> {

    @Query("select o from orders o where o.customer.id =:id order by o.id desc")
    List<Order> findAllByCustomerId(Integer id);

    @Modifying
    @Query("update orders o set o.status =:status where o.id =:id")
    void updateStatus(@Param("status") Integer status, @Param("id") Integer id);

    //    lấy số tiền trong từng tháng
    @Query("SELECT new CharBarDTO(MONTH(o.createDate) ,SUM(o.totalPayment)) FROM orders o WHERE YEAR(o.createDate) = 2022 GROUP BY MONTH(o.createDate) ORDER BY MONTH(o.createDate) ASC")
    List<CharBarDTO> chartBar();

    //      lấy số tiền trong 1 năm
    @Query("SELECT SUM(o.totalPayment) AS DOANHTHU FROM orders o WHERE YEAR(o.createDate) = :year and o.status = 3")
    Integer totalRevenue(@Param("year") Integer year);

    //    tổng đơn hàng
    @Query("select new TotalOrderDTO(count(o.id)) from orders o where o.status = 3")
    List<TotalOrderDTO>  totalOrder();

    //tổng đơn hủy
    @Query("select new OrderCancelDTO(count(o.id)) from orders o where o.status = 4")
    List<OrderCancelDTO> orderCancel();

    //    tông tien trong 1 ngay
    @Query("select sum(o.totalPayment) from orders o where o.createDate = current_date() and o.status = 3")
    Integer totalOneDay();
}