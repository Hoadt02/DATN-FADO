package com.fado.watch.service;

import org.springframework.web.multipart.MultipartFile;

import java.io.File;

public interface IUploadService {
     File upload(MultipartFile file, String folder);

}
