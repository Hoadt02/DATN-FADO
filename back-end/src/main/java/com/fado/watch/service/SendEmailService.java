// Java Program to Illustrate Creation Of
package com.fado.watch.service;

import com.fado.watch.dto.request.EmailDetails;

public interface SendEmailService {

    String sendSimpleMail(EmailDetails details);

    String sendMailWithAttachment(EmailDetails details);
}
