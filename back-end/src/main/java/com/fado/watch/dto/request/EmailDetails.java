package com.fado.watch.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor

public class EmailDetails {

    private String nameSender;
    private String emailSender;
    private String recipient;
    private String msgBody;
    private String subject;
    private String attachment;
}
