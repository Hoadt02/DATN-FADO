package com.fado.watch.service.impl;

import com.fado.watch.entity.Promotional;
import com.fado.watch.exception.ResourceNotFoundException;
import com.fado.watch.exception.UniqueException;
import com.fado.watch.repository.PromotionalRepository;
import com.fado.watch.service.IPromotionalService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;


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

        if (this.promotionalRepository.findByName(promotional.getName()).isPresent()) {
            throw new UniqueException("Tên chương trình khuyến mại đã tồn tại");
        }

        return this.promotionalRepository.save(promotional);
    }

    @Override
    public Promotional update(Promotional promotional) {
        Promotional promotionalBefore = this.promotionalRepository.findById(promotional.getId()).get();

        if (this.promotionalRepository.findByName(promotional.getName()).isPresent()
                && !Objects.equals(promotional.getName(), promotionalBefore.getName())) {
            throw new UniqueException("Tên chương trình khuyến mại đã tồn tại");
        }
        return this.promotionalRepository.save(promotional);
    }
}
