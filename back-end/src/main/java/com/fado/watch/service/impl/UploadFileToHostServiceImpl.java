package com.fado.watch.service.impl;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.fado.watch.service.IUploadImageToHostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;


@Service
public class UploadFileToHostServiceImpl implements IUploadImageToHostService {

    @Autowired
    Cloudinary cloudinary;

    @Override
    public List<String> upload(MultipartFile[] files) throws IOException {
        List<String> list = new ArrayList<>();
        for (MultipartFile file : files) {
            list.add(save(file));
        }
        return list;
    }

    private String save(MultipartFile file) throws IOException {
        Map map = this.cloudinary
                .uploader()
                .upload(file.getBytes(),
                        ObjectUtils.asMap("resource_type", "auto"));
        return map.get("secure_url").toString();
    }
}
