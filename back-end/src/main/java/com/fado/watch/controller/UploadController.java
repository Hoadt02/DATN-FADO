package com.fado.watch.controller;

import com.fado.watch.service.IUploadService;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.websocket.server.PathParam;
import java.io.File;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/v1/upload/images")
public class UploadController {
    @Autowired
    IUploadService service;

    @PostMapping("/{folder}")
    public Map upload(@RequestParam("file") MultipartFile file, @PathVariable("folder") String folder) {
        File saveFile = service.upload(file, folder);
        Map<String, String> map = new HashMap<>();
        map.put("name",saveFile.getName());
        return map;
    }

    @PostMapping("/detail/{folder}")
    public List<String> uploadImages(@RequestParam("file") MultipartFile[] files, @PathVariable("folder") String folder) {
        List<String> list = new ArrayList<>();
        for (MultipartFile file: files) {
            File saveFile = service.upload(file, folder);
            list.add(saveFile.getName());
        }
        return list;
    }
}
