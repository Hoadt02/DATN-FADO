package com.fado.watch.service;

import com.fado.watch.entity.Voucher;

import java.util.List;

public interface IVoucherService {
    List<Voucher> getAll();

    Voucher getById(Integer id);
    Voucher findByCode(String code);

    Voucher create(Voucher voucher);

    Voucher update(Voucher voucher);
}
