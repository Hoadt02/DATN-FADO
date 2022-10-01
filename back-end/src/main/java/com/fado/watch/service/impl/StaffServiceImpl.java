package com.fado.watch.service.impl;

import com.fado.watch.entity.Staff;
import com.fado.watch.exception.UniqueException;
import com.fado.watch.repository.StaffRepository;
import com.fado.watch.service.IStaffService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StaffServiceImpl implements IStaffService {

    private final StaffRepository staffRepository;

    public StaffServiceImpl(StaffRepository staffRepository) {
        this.staffRepository = staffRepository;
    }

    @Override
    public List<Staff> findAll() {
        return this.staffRepository.findAll();
    }

    @Override
    public Staff findById(Integer id) {
        return this.staffRepository.findById(id).get();
    }

    @Override
    public Staff create(Staff staff) {
        if (this.staffRepository.findByUsername(staff.getUsername()).isPresent()) {
            throw new UniqueException("Username đã tồn tại");
        }
        if (this.staffRepository.findByPhoneNumber(staff.getPhoneNumber()).isPresent()) {
            throw new UniqueException("Số điện thoại đã tồn tại");
        }
        if (this.staffRepository.findByEmail(staff.getEmail()).isPresent()) {
            throw new UniqueException("Email đã tồn tại");
        }
        staff.setStatus(1);
        return this.staffRepository.save(staff);
    }

    @Override
    public Staff update(Staff staff) {
        return this.staffRepository.save(staff);
    }

//    @Override
//    public void deleteStaff(Integer id) {
//        Staff staff = findById(id);
//        staff.setStatus(0);
//        this.staffRepository.save(staff);
//    }

}
