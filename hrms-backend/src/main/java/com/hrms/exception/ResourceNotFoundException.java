package com.hrms.exception;

import org.springframework.http.HttpStatus; // Import HttpStatus
import org.springframework.web.bind.annotation.ResponseStatus; // Import ResponseStatus

@ResponseStatus(HttpStatus.NOT_FOUND) // Add this annotation
public class ResourceNotFoundException extends RuntimeException {
    public ResourceNotFoundException(String message) {
        super(message);
    }
}