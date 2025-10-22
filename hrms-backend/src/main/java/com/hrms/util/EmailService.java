// File: src/main/java/com/hrms/util/EmailService.java
package com.hrms.util;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

/**
 * Service for sending emails within the HRMS application.
 */
@Service
public class EmailService {

    private final JavaMailSender mailSender;

    @Autowired
    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    /**
     * Sends a simple text email.
     *
     * @param to The recipient's email address.
     * @param subject The subject of the email.
     * @param text The body content of the email.
     * @throws MailException if there is an error sending the email.
     */
    public void sendEmail(String to, String subject, String text) throws MailException {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject(subject);
        message.setText(text);
        // You might want to set a 'from' address from application properties
        // message.setFrom("noreply@yourcompany.com");
        mailSender.send(message);
    }
}
