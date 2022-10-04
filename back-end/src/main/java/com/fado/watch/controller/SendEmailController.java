package com.fado.watch.controller;


import com.fado.watch.dto.EmailDetails;
import com.fado.watch.service.SendEmailService;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/v1")
public class SendEmailController {

    private final SendEmailService emailService;

    public SendEmailController(SendEmailService emailService) {
        this.emailService = emailService;
    }

    @PostMapping("/sendMail")
    public String sendMail(@RequestBody EmailDetails details) {
        return emailService.sendSimpleMail(details);
    }

    @PostMapping("/sendMailWithAttachment")
    public String sendMailWithAttachment(@RequestBody EmailDetails details) {
        return emailService.sendMailWithAttachment(details);
    }

}
