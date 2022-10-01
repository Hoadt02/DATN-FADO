package com.fado.watch.service.impl;

import com.fado.watch.entity.Customer;
import com.fado.watch.exception.UniqueException;
import com.fado.watch.repository.CustomerRepository;
import com.fado.watch.service.ICustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class CustomerServiceImpl implements ICustomerService {

   @Autowired
   CustomerRepository customerRepository;

    @Override
    public List<Customer> findAll() {
        return this.customerRepository.findAll();
    }

    @Override
    public Customer findbyId(Integer id) {
        return this.customerRepository.findById(id).get();
    }

    @Override
    public Customer create(Customer customer) {
        if (this.customerRepository.findByUsername(customer.getUsername()).isPresent()) {
            throw new UniqueException("Username đã tồn tại");
        }
        if (this.customerRepository.findByEmail(customer.getEmail()).isPresent()) {
            throw new UniqueException("Email đã tồn tại");
        }
        customer.setStatus(1);
        return this.customerRepository.save(customer);
    }

    @Override
    public Customer update(Customer customer) {
        return this.customerRepository.save(customer);
    }
}
