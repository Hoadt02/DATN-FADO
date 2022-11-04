// Generated with g9.

package com.fado.watch.dto.response;

import com.fado.watch.entity.Order;
import com.fado.watch.entity.Promotional;
import com.fado.watch.entity.Role;
import com.fado.watch.entity.Voucher;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class StaffDto implements Serializable {

    private Integer id;
    private String firstname;
    private String lastname;
    private LocalDate dateOfBirth;
    private String image;
    private String username;
    private String email;
    private String phoneNumber;
    private boolean gender;
    private String address;
    private Integer status;
    @OneToMany(mappedBy = "staff")
    @JsonIgnore
    private List<Order> orderList;

    @OneToMany(mappedBy = "staff")
    @JsonIgnore
    private List<Promotional> promotionalList;

    @ManyToOne(optional = false)
    @JoinColumn(name = "role_id", nullable = false)
    private Role role;

    @OneToMany(mappedBy = "staff")
    @JsonIgnore
    private List<Voucher> voucherList;

}
