package com.fado.watch.repository;

import com.fado.watch.entity.Customer;
import com.fado.watch.entity.Staff;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, Integer> {
    Optional<Customer> findByEmail(String email);
    Optional<Customer> findByUsername(String username);
    Optional<Customer> findByPhoneNumber(String phoneNumber);

}