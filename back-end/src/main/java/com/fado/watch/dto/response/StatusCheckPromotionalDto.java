package com.fado.watch.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.Id;

//thằng này nhận list status để check khuyến mại
@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class StatusCheckPromotionalDto {
    @Id
    private Integer status;
}
