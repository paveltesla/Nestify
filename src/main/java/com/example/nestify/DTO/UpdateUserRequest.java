package com.example.nestify.DTO;


import jakarta.validation.constraints.NotNull;

import java.util.List;

public class UpdateUserRequest {

    @NotNull(message = "Roles cannot be null")
    private List<String> roles;

    public List<String> getRoles() {
        return roles;
    }

    public void setRoles(List<String> roles) {
        this.roles = roles;
    }
}