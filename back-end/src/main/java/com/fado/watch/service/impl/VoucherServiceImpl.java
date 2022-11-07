package com.fado.watch.service.impl;

import com.fado.watch.entity.Voucher;
import com.fado.watch.exception.ResourceNotFoundException;
import com.fado.watch.repository.VoucherRepository;
import com.fado.watch.service.IVoucherService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Random;

@Service
public class VoucherServiceImpl implements IVoucherService {
    private final VoucherRepository voucherRepository;

    public VoucherServiceImpl(VoucherRepository voucherRepository) {
        this.voucherRepository = voucherRepository;
    }


    @Override
    public List<Voucher> getAll() {
        return this.voucherRepository.findAll();
    }

    @Override
    public Voucher getById(Integer id) {
        return this.voucherRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy voucher"));
    }

    // hiên viết, tìm theo code và đang hoạt động
    @Override
    public Voucher findByCode(String code) {
        return this.voucherRepository.findByCode(code);
    }
    //--------------------------------------------------------------

    @Override
    public Voucher create(Voucher voucher) {
        Random random = new Random();
        Long number = Math.abs(random.nextLong());
        for (int i = 0; i < getAll().size(); i++) {
            if (getAll().get(i).getCode().equals(number.toString().substring(0, 13))) {
                number = Math.abs(random.nextLong());
            }
        }
        voucher.setCode(number.toString());
        return this.voucherRepository.save(voucher);
    }

    @Override
    public Voucher update(Voucher voucher) {
        return this.voucherRepository.save(voucher);
    }
}
