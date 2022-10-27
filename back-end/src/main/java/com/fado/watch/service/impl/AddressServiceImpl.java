package com.fado.watch.service.impl;

import com.fado.watch.entity.Address;
import com.fado.watch.repository.AddressRepository;
import com.fado.watch.service.IAddressService;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
public class AddressServiceImpl implements IAddressService {

    private final AddressRepository addressRepository;

    public AddressServiceImpl(AddressRepository addressRepository) {
        this.addressRepository = addressRepository;
    }

    @Override
    public List<Address> findByCustomerId(Integer id) {
        return this.addressRepository.findByCustomerId(id);
    }

    @Override
    public Address create(Address address) {
        return this.addressRepository.save(address);
    }

    @Override
    public Address update(Address address) {
        return this.addressRepository.save(address);
    }

    @Override
    public void delete(Integer id) {
        this.addressRepository.deleteById(id);
    }
}
