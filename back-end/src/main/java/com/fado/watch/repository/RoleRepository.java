package com.fado.watch.repository;

import com.fado.watch.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface RoleRepository extends JpaRepository<Role, Integer> {

    @Query("SELECT r FROM roles r WHERE r.id = 24")
    Role getRoleCustomer();
}