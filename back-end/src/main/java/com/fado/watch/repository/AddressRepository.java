package com.fado.watch.repository;

import com.fado.watch.entity.Address;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AddressRepository extends JpaRepository<Address, Integer> {

    @Query("select a from address a where a.customer.id =:idCtm and a.defaultAddress = 1")
    Address findByCustomerIdAndDefaultAddress(Integer idCtm);

    List<Address> findByCustomerId(Integer id);
}