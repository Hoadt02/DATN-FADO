package com.fado.watch.repository;

import com.fado.watch.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Integer> {

    @Query("select o from orders o where o.customer.id =:id order by o.id desc")
    List<Order> findAllByCustomerId(Integer id);
}