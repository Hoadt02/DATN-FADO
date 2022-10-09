package com.fado.watch.service.impl;

import com.fado.watch.service.IUploadService;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.net.MalformedURLException;

@Service
public class UploadServiceImpl implements IUploadService {
    @Override
    public File upload(MultipartFile file, String folder) {
        String pathSystem = System.getProperty("user.dir");
        String path = pathSystem.substring(0, pathSystem.length() - 8) +  "front-end\\src\\assets\\img\\" + folder;
        File currentFile = new File(path);
        if (!currentFile.exists()){
            currentFile.mkdirs();
        }
        String name = file.getOriginalFilename();
        try {
            File saveFile = new File(currentFile, name);
            file.transferTo(saveFile);
            return saveFile;
        }catch (Exception e){
            throw new RuntimeException();
        }
    }
}
