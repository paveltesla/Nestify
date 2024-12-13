package com.example.nestify.exeption;

public class RoleNotFoundException extends Exception {
    public RoleNotFoundException(String message) {
        super(message);
    }
}