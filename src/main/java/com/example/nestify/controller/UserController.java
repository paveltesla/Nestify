package com.example.nestify.controller;

import com.example.nestify.models.LoginRequest;
import com.example.nestify.models.Role;
import com.example.nestify.models.Users;
import com.example.nestify.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserRepository userRepository;

    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @PostMapping("/register")
    public ResponseEntity<Map<String, String>> register(@RequestBody Users newUser) {
        Optional<Users> existingUser = userRepository.findByUsername(newUser.getUsername());
        if (existingUser.isPresent()) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("message", "Username already exists");
            return ResponseEntity.status(HttpStatus.CONFLICT).body(errorResponse);
        }
        userRepository.save(newUser);
        Map<String, String> successResponse = new HashMap<>();
        successResponse.put("message", "User registered successfully");
        return ResponseEntity.ok(successResponse);
    }


    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginRequest loginRequest) {
        Optional<Users> userOptional = userRepository.findByEmailAndPassword(
                loginRequest.getEmail(),
                loginRequest.getPassword()
        );

        if (userOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid email or password");
        }

        Users user = userOptional.get();

        // Получаем список ролей пользователя
        List<String> roles = user.getRoles().stream()
                .map(Role::getRoleName) // Извлекаем названия ролей
                .collect(Collectors.toList());

        // Формируем ответ с информацией о пользователе и его ролях
        Map<String, Object> response = new HashMap<>();
        response.put("id", user.getId());
        response.put("email", user.getEmail());
        response.put("username", user.getUsername());
        response.put("roles", roles);

        return ResponseEntity.ok(response);
    }


}
