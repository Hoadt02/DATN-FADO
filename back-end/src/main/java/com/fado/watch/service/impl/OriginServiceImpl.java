package com.fado.watch.service.impl;

import com.fado.watch.entity.Origin;
import com.fado.watch.exception.UniqueException;
import com.fado.watch.repository.OriginRepository;
import com.fado.watch.service.IOriginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
public class OriginServiceImpl implements IOriginService {
    @Autowired
    OriginRepository repository;

    @Override
    public List<Origin> getAll() {
        return repository.findAll();
    }

    @Override
    public Origin create(Origin origin) {
        if (this.repository.findByName(origin.getName()).isPresent()){
            throw new UniqueException("Xuất xứ đã tồn tại");
        }
        return this.repository.save(origin);
    }

    @Override
    public Origin update(Origin origin) {
        Origin originBefore = this.repository.findById(origin.getId()).get();

        if (this.repository.findByName(origin.getName()).isPresent()
        && !Objects.equals(origin.getName(),originBefore.getName())){
            throw new UniqueException("Xuất xứ đã tồn tại");
        }
        return this.repository.save(origin);
    }
}
