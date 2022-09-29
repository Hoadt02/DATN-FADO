// Generated with g9.

package com.fado.watch.entity;

import java.io.Serializable;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Version;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity(name="roles")
public class Role implements Serializable {

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(unique=true, nullable=false, precision=10)
    private Integer id;
    
    @Column(nullable=false, length=20)
    private String name;
    
    @OneToMany(mappedBy="role")
    @JsonIgnore
    private List<Customer> customerList;
    
    @OneToMany(mappedBy="role")
    @JsonIgnore
    private List<Staff> staffList;

}
