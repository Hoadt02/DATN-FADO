package com.fado.watch.service.impl;

import com.fado.watch.service.IUploadService;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;

@Service
public class UploadServiceImpl implements IUploadService {
    @Override
    public File upload(MultipartFile file, String folder, String url) {
        String pathSystem = System.getProperty("user.dir");
        String path_FE = pathSystem.substring(0, pathSystem.length() - 8) + url + folder;

        File currentFile = new File(path_FE);
        if (!currentFile.exists()){
            currentFile.mkdirs();
        }
        String name = file.getOriginalFilename();
        try {
            File saveFile = new File(currentFile, name);
            file.transferTo(saveFile);

            return saveFile;
        }catch (Exception e){
            e.printStackTrace();
            throw new RuntimeException();
        }
    }
}
