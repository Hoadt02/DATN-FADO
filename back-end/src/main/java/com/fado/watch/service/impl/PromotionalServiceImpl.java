package com.fado.watch.service.impl;

import com.fado.watch.entity.Promotional;
import com.fado.watch.exception.ResourceNotFoundException;
import com.fado.watch.repository.PromotionalRepository;
import com.fado.watch.service.IPromotionalService;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class PromotionalServiceImpl implements IPromotionalService {

    private final PromotionalRepository promotionalRepository;

    public PromotionalServiceImpl(PromotionalRepository promotionalRepository) {
        this.promotionalRepository = promotionalRepository;
    }

    @Override
    public List<Promotional> getAll() {
        return this.promotionalRepository.findAll();
    }

    @Override
    public Promotional getById(Integer id) {
        return this.promotionalRepository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException("Không tìm thấy khuyến mại!")
        );
    }

    @Override
    public Promotional create(Promotional promotional) {
        return this.promotionalRepository.save(promotional);
    }

    @Override
    public Promotional update(Promotional promotional) {
        return this.promotionalRepository.save(promotional);
    }
}
