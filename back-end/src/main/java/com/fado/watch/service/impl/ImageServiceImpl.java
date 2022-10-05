package com.fado.watch.service.impl;

import com.fado.watch.entity.Image;
import com.fado.watch.repository.ImageRepository;
import com.fado.watch.service.IImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ImageServiceImpl implements IImageService {
    @Autowired
    ImageRepository repository;

    @Override
    public List<Image> getAll() {
        return repository.findAll();
    }

    @Override
    public Image create(Image image) {
        return repository.save(image);
    }
}
