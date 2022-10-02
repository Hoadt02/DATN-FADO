package com.fado.watch.repository;

import com.fado.watch.entity.Staff;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface StaffRepository extends JpaRepository<Staff, Integer> {

    Optional<Staff> findByEmail(String email);

    Optional<Staff> findByUsername(String username);

    Optional<Staff> findByPhoneNumber(String phoneNumber);

}