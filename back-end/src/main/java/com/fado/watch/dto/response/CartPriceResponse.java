// Generated with g9.

package com.fado.watch.dto.response;

import com.fado.watch.entity.Customer;
import com.fado.watch.entity.ProductDetail;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;

//thằng này để thêm giá
@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class CartPriceResponse implements Serializable {

    @Id
    private Integer id;

    private Integer quantity;

    private Integer price;

    @ManyToOne
    @JoinColumn(name = "product_detail_id")
    private ProductDetail productDetail;

    @ManyToOne
    @JoinColumn(name = "customer_id")
    private Customer customer;

}
