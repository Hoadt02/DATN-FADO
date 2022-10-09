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
    public List<Image> getImagesByIdProductDetail(Integer id) {
        return repository.getImagesByProductDetailId(id);
    }

    @Override
    public Image create(Image image) {
        return repository.save(image);
    }

    @Override
    public void delete(Integer id) {
        List<Image> images = repository.findAll();
        for (Image image: images) {
            if (image.getProductDetail().getId() == Integer.parseInt(id.toString())){
                repository.delete(image);
            }
        }
    }
}
