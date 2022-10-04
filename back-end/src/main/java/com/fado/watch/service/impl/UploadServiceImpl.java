package com.fado.watch.service.impl;

import com.fado.watch.service.IUploadService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.ServletContext;
import java.io.File;

@Service
public class UploadServiceImpl implements IUploadService {
    @Override
    public File upload(MultipartFile file, String folder) {
        String path = System.getProperty("user.dir") +  "/src/main/resources/static/assets/" + folder;
        File currentFile = new File(path);
        System.out.println(currentFile.getAbsolutePath());
        if (!currentFile.exists()){
            currentFile.mkdirs();
        }
        String name = file.getOriginalFilename();
        try {
            File saveFile = new File(currentFile, name);
            file.transferTo(saveFile);
            System.out.println(saveFile.getAbsolutePath());
            return saveFile;
        }catch (Exception e){
            throw new RuntimeException();
        }
    }
}
