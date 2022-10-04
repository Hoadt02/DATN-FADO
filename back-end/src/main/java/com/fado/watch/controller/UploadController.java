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

@CrossOrigin("*")
@RestController
@RequestMapping("/api/v1/upload/images")
public class UploadController {
    @Autowired
    IUploadService service;

    @PostMapping("/{folder}")
    public JsonNode upload(@PathParam("file") MultipartFile file, @PathVariable("folder") String folder) {
        File saveFile = service.upload(file, folder);
        ObjectMapper mapper = new ObjectMapper();
        ObjectNode node = mapper.createObjectNode();
        node.put("name", saveFile.getName());
        node.put("size", saveFile.length());
        return node;
    }
}
