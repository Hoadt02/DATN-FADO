package com.fado.watch.service.impl;

import java.io.File;
import java.util.Random;
import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

import com.fado.watch.dto.request.EmailDetails;
import com.fado.watch.service.ISendEmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.FileSystemResource;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
public class SendEmailServiceImpl implements ISendEmailService {

    private static Integer OTP;
    private static Integer TIME_LIFE_OTP;

    @Autowired
    private JavaMailSender javaMailSender;

    @Value("${spring.mail.username}")
    private String sender;

    public String sendSimpleMail(EmailDetails details) {
        try {

            SimpleMailMessage mailMessage = new SimpleMailMessage();

            mailMessage.setFrom(sender);
            mailMessage.setTo(details.getRecipient());
            mailMessage.setText(details.getMsgBody());
            mailMessage.setSubject(details.getSubject());

            this.javaMailSender.send(mailMessage);
            return "Mail Sent Successfully...";
        } catch (Exception e) {
            System.out.println(e);
            return "Error while Sending Mail";
        }
    }

    public String sendMailWithAttachment(EmailDetails details) {
        MimeMessage mimeMessage = this.javaMailSender.createMimeMessage();
        MimeMessageHelper mimeMessageHelper;

        try {
            mimeMessageHelper = new MimeMessageHelper(mimeMessage, true);
            mimeMessageHelper.setFrom(sender);
            mimeMessageHelper.setTo(details.getRecipient());
            mimeMessageHelper.setText(details.getMsgBody(), true);
            mimeMessageHelper.setSubject(
                    details.getSubject());

            FileSystemResource file = new FileSystemResource(
                    new File(details.getAttachment()));

            mimeMessageHelper.addAttachment(file.getFilename(), file);

            this.javaMailSender.send(mimeMessage);
            return "Mail sent Successfully";
        } catch (MessagingException e) {
            System.out.println(e);
            return "Error while sending mail!!!";
        }
    }

    @Override
    public void sendMailOTP(String email) {
        Random random = new Random();
        Integer number = Math.abs(random.nextInt());
        String numberToString = number.toString().substring(0,6);
        OTP = Integer.parseInt(numberToString);
        TIME_LIFE_OTP = (int) System.currentTimeMillis() + 180000;

        EmailDetails emailDetails = new EmailDetails();
        emailDetails.setRecipient(email);
        emailDetails.setSubject("MÃ XÁC THỰC THAY ĐỔI MẬT KHẨU");
        emailDetails.setMsgBody("Chào bạn,\n" +
                "\n" +
                "FADO Shop đã nhận được yêu cầu thay đổi mật khẩu của bạn.\n" +
                "Mã OTP để thay đổi mật khẩu là: " + OTP +"\n" +
                "\n" +
                "Lưu ý: mã OTP này chỉ có hiệu lực trong vòng 3 phút.\n" +
                "\n" +
                "Mọi thắc mắc và góp ý vui lòng liên hệ với FADO Shop:\n" +
                "- Email: fado@gmail.com\n" +
                "- Số điện thoại: 0123456789\n" +
                "\n" +
                "Trân trọng!");

        sendSimpleMail(emailDetails);
    }

    @Override
    public Boolean verificationOTP(String code) {
        Integer timeCurrent = (int) System.currentTimeMillis();
        if (Integer.parseInt(code) == OTP && TIME_LIFE_OTP >= timeCurrent){
            return true;
        }
        return false;
    }

    @Override
    public Boolean sendMailContact(EmailDetails details) {
       try {
           details.setRecipient("dotathoa2002@gmail.com");
           details.setSubject("LIÊN HỆ TỪ KHÁCH HÀNG - TIÊU ĐỀ: " + details.getSubject());
           details.setMsgBody(details.getMsgBody() + "\n\n" + "Người gửi: " + details.getNameSender() + "\n" +
                   "Email: " + details.getEmailSender());
           sendSimpleMail(details);
           return true;
       }catch (Exception e){
           return false;
       }
    }
}
