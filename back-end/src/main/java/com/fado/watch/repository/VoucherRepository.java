package com.fado.watch.repository;

import com.fado.watch.entity.Voucher;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface VoucherRepository extends JpaRepository<Voucher, Integer> {

    // tìm theo code đang hoạt động
    @Query("select v from vouchers v where v.code = :code and v.status = 1")
    Voucher findByCode(String code);

}