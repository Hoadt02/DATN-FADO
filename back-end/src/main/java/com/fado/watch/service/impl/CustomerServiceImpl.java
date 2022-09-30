package com.fado.watch.service.impl;

import com.fado.watch.entity.Customer;
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
}
