package com.fado.watch.repository;

import com.fado.watch.entity.OrderDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderDetailRepository extends JpaRepository<OrderDetail, Integer> {

    @Query("select o from order_details o where o.order.customer.id =:id")
    List<OrderDetail> findAllDetailByCustomerId(Integer id);

//    List<OrderDetail> findAllByOrderId(Integer id);
}