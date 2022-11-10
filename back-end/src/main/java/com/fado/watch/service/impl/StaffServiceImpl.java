package com.fado.watch.service.impl;

import com.fado.watch.dto.response.StaffDto;
import com.fado.watch.entity.Staff;
import com.fado.watch.exception.ResourceNotFoundException;
import com.fado.watch.exception.UniqueException;
import com.fado.watch.repository.StaffRepository;
import com.fado.watch.service.IStaffService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
public class StaffServiceImpl implements IStaffService {

    private final ModelMapper mapper;
    private final StaffRepository staffRepository;

    public StaffServiceImpl(ModelMapper mapper, StaffRepository staffRepository) {
        this.mapper = mapper;
        this.staffRepository = staffRepository;
    }

    @Autowired
    PasswordEncoder passwordEncoder;

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
        staff.setPassword(passwordEncoder.encode(staff.getPassword()));
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

        if (!staffBefore.getPassword().equals(staff.getPassword())){
            staff.setPassword(passwordEncoder.encode(staff.getPassword()));
        }
        return this.staffRepository.save(staff);
    }

    @Override
    public Staff findByUsername(String username) {
        return staffRepository.findByUsername(username).orElseThrow(() -> new ResourceNotFoundException("Username không tồn tại!"));
    }

    @Override
    public Staff findStaffByEmail(String email) {
        return staffRepository.findByEmail(email).orElseThrow(() -> new ResourceNotFoundException("Email không tồn tại!"));
    }

    @Override
    public Boolean existsByEmail(String email) {
        return staffRepository.existsByEmail(email);
    }

//    @Override
//    public void deleteStaff(Integer id) {
//        Staff staff = findById(id);
//        staff.setStatus(0);
//        this.staffRepository.save(staff);
//    }

}
