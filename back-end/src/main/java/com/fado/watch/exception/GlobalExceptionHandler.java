package com.fado.watch.exception;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.Date;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(UniqueException.class)
    public ResponseEntity<?> UniqueExceptionHandler(UniqueException exception) {
        ErrorMessage errorMessage = new ErrorMessage("UNIQUE", exception.getMessage(), new Date());
        return new ResponseEntity<>(errorMessage, HttpStatus.BAD_REQUEST);
    }
}
