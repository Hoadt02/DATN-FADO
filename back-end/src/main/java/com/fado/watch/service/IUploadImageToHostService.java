package com.fado.watch.service;

import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;


public interface IUploadImageToHostService {

    List<String> upload(MultipartFile[] files) throws IOException;

}
