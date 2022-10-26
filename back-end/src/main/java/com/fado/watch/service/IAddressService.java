package com.fado.watch.service;

import com.fado.watch.entity.Address;
import com.fado.watch.entity.Brand;

import java.util.List;

public interface IAddressService {

    List<Address> findByCustomerId(Integer id);

    Address create(Address address);

    Address update(Address address);

    void delete(Integer id);
}
