package com.fado.watch.service;

import com.fado.watch.dto.request.ChangePassModel;
import com.fado.watch.dto.response.StaffDto;
import com.fado.watch.entity.Staff;

import java.util.List;

public interface IStaffService {

    List<Staff> findAll();

    Staff findById(Integer id);

    Staff create(Staff staff);

    Staff update(Staff staff);
//    void deleteStaff(Integer id);

    Staff findByUsername(String username);

    Staff findStaffByEmail(String email);

    Boolean existsByEmail(String email);
    Staff checkPassAndFindStaff(ChangePassModel model);
}
