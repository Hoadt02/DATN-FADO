package com.fado.watch.service;

import com.fado.watch.entity.Customer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

public interface ICustomerService {
    List<Customer> findAll();
    Customer findbyId(Integer id);
    Customer create(Customer customer);
    Customer update(Customer customer);
    Boolean existsByUsername(String username);
    Boolean existsByEmail(String email);
    Customer findCustomerByEmail(String email);
    Customer findByUsername(String username);
}
