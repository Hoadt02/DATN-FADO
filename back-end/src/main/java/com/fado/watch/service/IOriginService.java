package com.fado.watch.service;

import com.fado.watch.entity.Origin;

import java.util.List;

public interface IOriginService {
    List<Origin> getAll();

    Origin create(Origin origin);
    Origin update(Origin origin);
}
