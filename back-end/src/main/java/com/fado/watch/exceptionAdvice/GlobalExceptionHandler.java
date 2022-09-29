package com.fado.watch.exceptionAdvice;


import com.fado.watch.exception.ErrorMessage;
import com.fado.watch.exception.UniqueException;
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
