package com.fado.watch.service.impl;

import com.fado.watch.dto.request.ChangePassModel;
import com.fado.watch.entity.Customer;
import com.fado.watch.entity.Staff;
import com.fado.watch.exception.ResourceNotFoundException;
import com.fado.watch.exception.UniqueException;
import com.fado.watch.exception.WrongPasswordException;
import com.fado.watch.repository.CustomerRepository;
import com.fado.watch.repository.RoleRepository;
import com.fado.watch.service.ICustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
public class CustomerServiceImpl implements ICustomerService {

private final CustomerRepository customerRepository;

    public CustomerServiceImpl(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    RoleRepository roleRepository;

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
            throw new UniqueException("Username đã tồn tại!");
        }
        if (this.customerRepository.findByPhoneNumber(customer.getPhoneNumber()).isPresent()) {
            throw new UniqueException("Số điện thoại đã tồn tại!");
        }
        if (this.customerRepository.findByEmail(customer.getEmail()).isPresent()) {
            throw new UniqueException("Email đã tồn tại!");
        }
        customer.setPassword(passwordEncoder.encode(customer.getPassword()));
        customer.setRole(roleRepository.getRoleCustomer());
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
        if (!customerBefore.getPassword().equals(customer.getPassword())){
            customer.setPassword(passwordEncoder.encode(customer.getPassword()));
        }
        customer.setRole(roleRepository.getRoleCustomer());
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

    @Override
    public Customer findCustomerByEmail(String email) {
        return customerRepository.findByEmail(email).orElseThrow(() -> new ResourceNotFoundException("Email không tồn tại!"));
    }

    @Override
    public Customer findByUsername(String username) {
        return customerRepository.findByUsername(username).orElseThrow(() -> new ResourceNotFoundException("Username không tồn tại!"));
    }

    @Override
    public Customer checkPassAndFindCustomer(ChangePassModel model) {
        Customer customer = customerRepository.findById(model.getId()).orElseThrow(() -> new ResourceNotFoundException("Tài khoản hiện tại của bạn không tồn tại!"));
        if (passwordEncoder.matches(model.getPassword(),customer.getPassword())){
            return customer;
        }
        return null;
    }
}
