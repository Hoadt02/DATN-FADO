package com.fado.watch.service;

import com.fado.watch.entity.Image;

import java.util.List;

public interface IImageService {
    List<Image> getImagesByIdProductDetail(Integer id);

    Image create(Image image);

    void delete(Integer id);
}
