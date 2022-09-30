package com.fado.watch.service.impl;

import com.fado.watch.entity.Origin;
import com.fado.watch.repository.OriginRepository;
import com.fado.watch.service.IOriginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OriginServiceImpl implements IOriginService {
    @Autowired
    OriginRepository repository;

    @Override
    public List<Origin> getAll() {
        return repository.findAll();
    }
}
