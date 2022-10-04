package com.fado.watch.controller;

import com.fado.watch.service.IUploadImageToHostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;


@RequestMapping("/api/v1/upload-to-host")
@RestController
@CrossOrigin("*")
public class UploadImageToHostController {

    @Autowired
    IUploadImageToHostService imageService;

    @PostMapping
    public ResponseEntity<?> uploadImage(@RequestParam("files") MultipartFile[] files) throws IOException {
        return new ResponseEntity<>(this.imageService.upload(files), HttpStatus.OK);
    }
}
