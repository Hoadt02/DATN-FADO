package com.fado.watch.exceptionAdvice;


import com.fado.watch.exception.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.Date;

@ControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(UniqueException.class)
    public ResponseEntity<?> uniqueExceptionHandler(UniqueException exception) {
        ErrorMessage errorMessage = new ErrorMessage("UNIQUE", exception.getMessage(), new Date());
        return new ResponseEntity<>(errorMessage, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<?> resourceNotFoundExceptionHandler(ResourceNotFoundException exception){
        ErrorMessage errorMessage = new ErrorMessage("NOT_FOUND", exception.getMessage(), new Date());
        return new ResponseEntity<>(errorMessage, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(LoginFailedException.class)
    public ResponseEntity<?> loginFailedExceptionHandler(LoginFailedException exception){
        ErrorMessage errorMessage = new ErrorMessage("LOGIN_FAILED", exception.getMessage(), new Date());
        return new ResponseEntity<>(errorMessage, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(UserDisableException.class)
    public ResponseEntity<?> userDisableExceptionHandler(UserDisableException exception){
        ErrorMessage errorMessage = new ErrorMessage("USER_DISABLE", exception.getMessage(), new Date());
        return new ResponseEntity<>(errorMessage, HttpStatus.BAD_REQUEST);
    }

}
