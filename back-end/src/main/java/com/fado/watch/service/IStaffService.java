package com.fado.watch.service;

import com.fado.watch.entity.Staff;

import java.util.List;

public interface IStaffService {

    List<Staff> findAll();

    Staff findById(Integer id);

    Staff create(Staff staff);

    Staff update(Staff staff);

//    void deleteStaff(Integer id);
}
