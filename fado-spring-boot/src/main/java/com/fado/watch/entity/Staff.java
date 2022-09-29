// Generated with g9.

package com.fado.watch.entity;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Version;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "staffs")
public class Staff implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(unique = true, nullable = false, precision = 10)
    private Integer id;

    @Column(nullable = false, length = 50)
    private String firstname;

    @Column(nullable = false, length = 50)
    private String lastname;

    @Column(name = "date_of_birth", nullable = false)
    private LocalDate dateOfBirth;

    @Column(nullable = false, length = 255)
    private String image;

    @Column(nullable = false, length = 50, unique = true)
    private String username;

    @Column(nullable = false, length = 50)
    private String password;

    @Column(nullable = false, length = 50, unique = true)
    private String email;

    @Column(name = "phone_number", nullable = false, length = 10, unique = true)
    private String phoneNumber;

    @Column(nullable = false, length = 1)
    private boolean gender;

    @Column(nullable = false, length = 255)
    private String address;

    @Column(precision = 10)
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
