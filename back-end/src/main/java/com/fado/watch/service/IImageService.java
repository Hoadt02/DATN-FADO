package com.fado.watch.service;

import com.fado.watch.entity.Image;

import java.util.List;

public interface IImageService {
    List<Image> getAll();

    Image create(Image image);
}
