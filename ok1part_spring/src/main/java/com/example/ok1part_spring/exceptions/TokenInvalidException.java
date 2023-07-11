package com.example.ok1part_spring.exceptions;

import java.io.Serial;

public class TokenInvalidException extends RuntimeException {
    @Serial
    private static final long serialVersionUID = 1L;

    public TokenInvalidException(String message)
    {
        super(message);
    }

}