package com.example.nestify.controller;

import com.example.nestify.DTO.UpdateUserRequest;
import com.example.nestify.exeption.UserNotFoundException;
import com.example.nestify.models.Users;
import com.example.nestify.repository.RoleRepository;
import com.example.nestify.repository.UserRepository;
import com.example.nestify.services.UserServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;
import com.example.nestify.exeption.RoleNotFoundException;
import java.util.*;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private UserServices userService;

    // Обновление пользователя
    @PutMapping("users/{id}")
    public ResponseEntity<String> updateUser(@PathVariable Long id, @RequestBody @Valid UpdateUserRequest request) {
        try {
            // Обновление пользователя через сервис
            userService.updateUserRoles(id, request.getRoles());
            return ResponseEntity.ok("User roles updated successfully");
        } catch (UserNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        } catch (RoleNotFoundException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid roles: " + e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred");
        }
    }

    // Удаление пользователя
    @DeleteMapping("/users/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable Long id) {
        try {
            userService.deleteUser(id);
            return ResponseEntity.ok("User deleted successfully");
        } catch (UserNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }
    }

    // Получить всех пользователей
    @GetMapping("/users")
    public ResponseEntity<List<Users>> getAllUsers() {
        List<Users> users = userRepository.findAll();
        return ResponseEntity.ok(users);
    }
}

