package com.example.nestify.controller;

import com.example.nestify.models.*;
import com.example.nestify.repository.UserRepository;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;

import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/users")
@Validated // Используется для валидации входных данных
public class UserController {

    private final UserRepository userRepository;

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;

    }


    // Регистрация пользователя с валидацией
    @PostMapping("/register")
    public ResponseEntity<Map<String, String>> register(@Valid @RequestBody Users newUser) {
        // Проверка на существующего пользователя
        if (userRepository.findByUsername(newUser.getUsername()).isPresent()) {
            return new ResponseEntity<>(Collections.singletonMap("message", "Username already exists"), HttpStatus.CONFLICT);
        }
        // Хешируем пароль перед сохранением
        newUser.setPassword(passwordEncoder.encode(newUser.getPassword()));
        userRepository.save(newUser);

        return ResponseEntity.ok(Collections.singletonMap("message", "User registered successfully"));
    }

    // Логин пользователя с обработкой исключений
    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginRequest loginRequest) {
        Users user = userRepository.findByEmail(loginRequest.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Проверяем пароль
        if (!passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid email or password");
        }
        // Получаем роли пользователя
        List<String> roles = user.getRoles().stream()
                .map(Role::getRoleName)
                .collect(Collectors.toList());

        // Создаём ответ с информацией о пользователе
        Map<String, Object> response = new HashMap<>();
        response.put("id", user.getId());
        response.put("email", user.getEmail());
        response.put("username", user.getUsername());
        response.put("roles", roles);

        return ResponseEntity.ok(response);
    }
}
