package com.fado.watch.service;

import com.fado.watch.entity.Promotional;

import java.util.List;

public interface IPromotionalService {

    List<Promotional> getAll();

    Promotional getById(Integer id);

    Promotional create(Promotional promotional);

    Promotional update(Promotional promotional);


}
