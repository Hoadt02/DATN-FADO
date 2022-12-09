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

import java.time.LocalDate;
import java.util.Date;
import javax.transaction.Transactional;
import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Integer> {

    @Query("select o from orders o where o.customer.id =:id and o.type = 0 order by o.id desc")
    List<Order> findAllByCustomerId(Integer id);

    @Query("select o from orders o where o.type = 0 order by o.id desc")
    List<Order> findAllFaDo();

    @Query("select o from orders o where o.id =:id and o.type = 0")
    Order findOrderByIdFado(Integer id);

    @Modifying()
    @Query("update orders o set o.shipAddress = :shipAddress, o.fullname = :fullname, o.phoneNumber = :phoneNumber, o.feeShipping = :feeShipping, o.totalPayment = :totalPayment where o.id = :id")
    void changeInfoOrder(
            @Param("shipAddress") String shipAddress
            , @Param("fullname") String fullname
            , @Param("phoneNumber") String phoneNumber
            , @Param("feeShipping") Integer feeShipping
            , @Param("totalPayment") Integer totalPayment
            , @Param("id") Integer id);

    @Modifying
    @Query("update orders o set o.status =:status where o.id =:id")
    void updateStatus(@Param("status") Integer status, @Param("id") Integer id);

    @Modifying
    @Query("update orders o set o.status = 6 , o.description = :description where o.id =:id")
    void revertOrder(@Param("description") String description, @Param("id") Integer id);


    //    lấy số tiền trong từng tháng
    @Query("SELECT new CharBarDTO(MONTH(o.createDate) ,SUM(o.totalPayment)) FROM orders o WHERE YEAR(o.createDate) = :year and o.status = 3 GROUP BY MONTH(o.createDate) ORDER BY MONTH(o.createDate) ASC")
    List<CharBarDTO> chartBar(@Param("year") Integer year);

    //      lấy số tiền trong 1 năm
    @Query("SELECT SUM(o.totalPayment) AS DOANHTHU FROM orders o WHERE YEAR(o.createDate) = :year and o.status = 3")
    Integer totalRevenue(@Param("year") Integer year);

    //    tổng đơn hàng
    @Query("select new TotalOrderDTO(count(o.id)) from orders o where o.status = 3")
    List<TotalOrderDTO> totalOrder();

    //tổng đơn hủy
    @Query("select new OrderCancelDTO(count(o.id)) from orders o where o.status = 4")
    List<OrderCancelDTO> orderCancel();

    //    tông tien trong 1 ngay
    @Query("select sum(o.totalPayment) from orders o where o.createDate = current_date() and o.status = 3")
    Integer totalOneDay();

    // Day la` pha`n toi nha' ba.n hien da.u da.u
    @Query("select o from orders o where o.staff.id =:id and o.type = 1")
    List<Order> getOrderByStaff(Integer id);

    @Query("select o from orders o where o.id =:id and o.type = 1")
    List<Order> getOrderById(Integer id);

    @Query("select o from orders o where o.id =:id and o.type = 1")
    Order findOrderById(Integer id);

    @Query("select o from orders o where o.staff.id = :id and o.status = :status and o.type = 1")
    List<Order> getOrderHistory(@Param("id") Integer id, @Param("status") Integer status);

    @Query("select o from orders o where 1 = 1"
            + "and (:startDate is null or o.createDate >= :startDate )"
            + "and (:endDate is null or o.createDate <= :endDate)"
            + "and (:customerId is null or o.customer.id = :customerId) "
            + "order by o.id desc ")
    List<Order> filterOrder(@Param("startDate") LocalDate startDate,
                            @Param("endDate") LocalDate endDate,
                            @Param("customerId") Integer customerId);

    @Query("select o from orders o where o.staff.id = :idNV and o.status = 0 and o.type = 1")
    List<Order> getListOrder(@Param("idNV") Integer idNV);
}