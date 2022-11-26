package com.fado.watch.repository;

import com.fado.watch.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Integer> {

    @Query("select o from orders o where o.customer.id =:id and o.type = 0 order by o.id desc")
    List<Order> findAllByCustomerId(Integer id);

    @Modifying
    @Query("update orders o set o.status =:status where o.id =:id")
    void updateStatus(@Param("status") Integer status, @Param("id") Integer id);


    // Day la` pha`n toi nha' ba.n hien da.u da.u
    @Query("select o from orders o where o.staff.id =:id and o.type = 1")
    List<Order> getOrderByStaff(Integer id);

    @Query("select o from orders o where o.id =:id and o.type = 1")
    List<Order> getOrderById(Integer id);

    @Query("select o from orders o where o.id =:id and o.type = 1")
    Order findOrderById(Integer id);

    @Query("select o from orders o where o.staff.id = :id and o.status = :status and o.type = 1")
    List<Order> getOrderHistory(@Param("id") Integer id, @Param("status") Integer status);
}