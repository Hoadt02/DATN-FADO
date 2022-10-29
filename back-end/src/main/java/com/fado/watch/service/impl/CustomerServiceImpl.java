package com.fado.watch.service.impl;

import com.fado.watch.entity.Customer;
import com.fado.watch.entity.Staff;
import com.fado.watch.exception.UniqueException;
import com.fado.watch.repository.CustomerRepository;
import com.fado.watch.service.ICustomerService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
public class CustomerServiceImpl implements ICustomerService {

private final CustomerRepository customerRepository;

    public CustomerServiceImpl(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }

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
        if (this.customerRepository.findByPhoneNumber(customer.getPhoneNumber()).isPresent()) {
            throw new UniqueException("Số điện thoại đã tồn tại");
        }
        if (this.customerRepository.findByEmail(customer.getEmail()).isPresent()) {
            throw new UniqueException("Email đã tồn tại");
        }
        return this.customerRepository.save(customer);
    }

    @Override
    public Customer update(Customer customer) {
        Customer customerBefore = this.customerRepository.findById(customer.getId()).get();
        if (this.customerRepository.findByUsername(customer.getUsername()).isPresent()
                && !Objects.equals(customer.getUsername(), customerBefore.getUsername())) {
            throw new UniqueException("Username đã tồn tại");
        }
        if (this.customerRepository.findByPhoneNumber(customer.getPhoneNumber()).isPresent()
                && !Objects.equals(customer.getPhoneNumber(), customerBefore.getPhoneNumber())) {
            throw new UniqueException("Số điện thoại đã tồn tại");
        }
        if (this.customerRepository.findByEmail(customer.getEmail()).isPresent()
                && !Objects.equals(customer.getEmail(), customerBefore.getEmail())) {
            throw new UniqueException("Email đã tồn tại");
        }
        return this.customerRepository.save(customer);
    }

    @Override
    public Boolean existsByUsername(String username) {
        return customerRepository.existsByUsername(username);
    }

    @Override
    public Boolean existsByEmail(String email) {
        return customerRepository.existsByEmail(email);
    }
}
