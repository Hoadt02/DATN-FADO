package com.fado.watch.security.userprincal.staff;

import com.fado.watch.entity.Staff;
import com.fado.watch.repository.StaffRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class StaffUserDetailService implements UserDetailsService {

    @Autowired
    StaffRepository staffRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Staff staff = staffRepository.findByUsername(username).orElseThrow(() -> new UsernameNotFoundException("Không tìm thấy tài khoản nhân viên có username là: " + username));
        return StaffUserPrinciple.build(staff);

    }
}
