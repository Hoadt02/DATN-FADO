package com.fado.watch.security.userprincal.customer;

import com.fado.watch.entity.Customer;
import com.fado.watch.entity.Role;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDate;
import java.util.Collection;
import java.util.Collections;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CustomerUserPrinciple implements UserDetails {
    private Integer id;
    private String firstname;
    private String lastname;
    private LocalDate dateOfBirth;
    private String image;
    private String username;
    @JsonIgnore
    private String password;
    private String email;
    private String phoneNumber;
    private boolean gender;
    private Integer status;
    private Role role;

    public static CustomerUserPrinciple build(Customer customer){
        return new CustomerUserPrinciple(
                customer.getId(),
                customer.getFirstname(),
                customer.getLastname(),
                customer.getDateOfBirth(),
                customer.getImage(),
                customer.getUsername(),
                customer.getPassword(),
                customer.getEmail(),
                customer.getPhoneNumber(),
                customer.isGender(),
                customer.getStatus(),
                customer.getRole()
        );
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.singleton(new SimpleGrantedAuthority(this.role.getName()));
    }

    @Override
    public String getPassword() {
        return this.password;
    }

    @Override
    public String getUsername() {
        return this.username;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
