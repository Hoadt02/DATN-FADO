// Java Program to Illustrate Creation Of
package com.fado.watch.service;

import com.fado.watch.dto.request.EmailDetails;

public interface ISendEmailService {

    String sendSimpleMail(EmailDetails details);

    String sendMailWithAttachment(EmailDetails details);

    void sendMailOTP(String email);

    Boolean verificationOTP(String code);

    Boolean sendMailContact(EmailDetails details);
}
