package com.fado.watch.controller;

import com.fado.watch.service.IUploadService;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.net.MalformedURLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/v1/upload/images")
public class UploadController {

    private final String URL_ADMIN = "FE\\src\\assets\\img\\";
    private final String URL_CLIENT = "fado-shop\\src\\assets\\img\\";

    @Autowired
    IUploadService service;

    @PostMapping("/{folder}")
    public Map upload(@RequestParam("file") MultipartFile file, @PathVariable("folder") String folder) {
        File saveFile1 = service.upload(file, folder, URL_ADMIN);
        Map<String, String> map = new HashMap<>();
        map.put("name",saveFile1.getName());
        return map;
    }

    @PostMapping("/detail/{folder}")
    public List<String> uploadImages(@RequestParam("file") MultipartFile[] files, @PathVariable("folder") String folder) {
        List<String> list = new ArrayList<>();
        for (MultipartFile file: files) {
            File saveFile1 = service.upload(file, folder, URL_ADMIN);
            list.add(saveFile1.getName());
        }
        return list;
    }

    @PostMapping("/client/{folder}")
    public void uploadClient(@RequestParam("file") MultipartFile file, @PathVariable("folder") String folder) {
         service.upload(file, folder, URL_CLIENT);
    }

    @PostMapping("/client/detail/{folder}")
    public void uploadImagesClient(@RequestParam("file") MultipartFile[] files, @PathVariable("folder") String folder) {
        for (MultipartFile file: files) {
            service.upload(file, folder, URL_CLIENT);
        }
    }
}
