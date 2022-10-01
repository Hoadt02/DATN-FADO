package com.fado.watch.repository;

import com.fado.watch.entity.Staff;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface StaffRepository extends JpaRepository<Staff, Integer> {

    Staff findByEmail(String email);

    Staff findByUsername(String username);

    Staff findByPhoneNumber(String phoneNumber);

}