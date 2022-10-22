package com.fado.watch.service.impl;

import com.fado.watch.entity.Staff;
import com.fado.watch.exception.ResourceNotFoundException;
import com.fado.watch.exception.UniqueException;
import com.fado.watch.repository.StaffRepository;
import com.fado.watch.service.IStaffService;
import org.springframework.stereotype.Service;

import java.rmi.NotBoundException;
import java.util.List;
import java.util.Objects;

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
        return this.staffRepository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException("Không tìm thấy nhân viên"));
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
        return this.staffRepository.save(staff);
    }

    @Override
    public Staff update(Staff staff) {
        Staff staffBefore = this.staffRepository.findById(staff.getId()).get();

        if (this.staffRepository.findByUsername(staff.getUsername()).isPresent() && !Objects.equals(staff.getUsername(), staffBefore.getUsername())) {
            throw new UniqueException("Username đã tồn tại ở tài khoản khác");
        }
        if (this.staffRepository.findByPhoneNumber(staff.getPhoneNumber()).isPresent() && !Objects.equals(staff.getPhoneNumber(), staffBefore.getPhoneNumber())) {
            throw new UniqueException("Số điện thoại đã tồn tại ở tài khoản khác");
        }
        if (this.staffRepository.findByEmail(staff.getEmail()).isPresent() && !Objects.equals(staff.getEmail(), staffBefore.getEmail())) {
            throw new UniqueException("Email đã tồn tại ở tài khoản khác");
        }
        return this.staffRepository.save(staff);
    }

//    @Override
//    public void deleteStaff(Integer id) {
//        Staff staff = findById(id);
//        staff.setStatus(0);
//        this.staffRepository.save(staff);
//    }

}
