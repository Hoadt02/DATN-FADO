package com.fado.watch.controller;


import com.fado.watch.dto.request.EmailDetails;
import com.fado.watch.service.ISendEmailService;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/v1")
public class SendEmailController {

    private final ISendEmailService emailService;

    public SendEmailController(ISendEmailService emailService) {
        this.emailService = emailService;
    }

    @PostMapping("/sendMail")
    public String sendMailOTP(@RequestBody EmailDetails details) {
        return emailService.sendSimpleMail(details);
    }

    @PostMapping("/sendMailWithAttachment")
    public String sendMailWithAttachment(@RequestBody EmailDetails details) {
        return emailService.sendMailWithAttachment(details);
    }
    @GetMapping("/sendMail/{code}")
    public Boolean verificationOTP(@PathVariable("code") String code){
        return emailService.verificationOTP(code);
    }

    @PostMapping("/sendMailAgain")
    public void sendMailAgain(@RequestBody String email){
        emailService.sendMailOTP(email);
    }

    @PostMapping("/sendMailContact")
    public Boolean sendMailContact(@RequestBody EmailDetails details){
        return emailService.sendMailContact(details);
    }
}
