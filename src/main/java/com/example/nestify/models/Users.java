package com.example.nestify.models;
import jakarta.persistence.*;
import jakarta.persistence.Table;

import java.time.LocalTime;

@Entity
@Table(name = "users")

public class Users {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Column(unique = true)
    private String username;
    private String name;
    private String email;
    private String password;
    private LocalTime createdAt;

    public Users() {}

    // Конструктор с ID
    public Users(Long id) {
        this.id = id;
    }


    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }
    public void setName(String name) {
        this.name = name;
    }
    public String getName() {
        return name;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public String getEmail() {
        return email;
    }
    public void setPassword(String password) {
        this.password = password;
    }
    public String getPassword() {
        return password;
    }
    public void setCreatedAt(LocalTime createdAt) {
        this.createdAt = createdAt;
    }
    public LocalTime getCreatedAt() {
        return createdAt;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }
}
