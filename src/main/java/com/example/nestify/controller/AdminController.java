package com.example.nestify.controller;

import com.example.nestify.models.Role;
import com.example.nestify.models.Users;
import com.example.nestify.repository.RoleRepository;
import com.example.nestify.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/admin")

public class AdminController {

    @Autowired
    UserRepository userRepository;

    @Autowired
    RoleRepository roleRepository;

    @PutMapping("users/{id}")
    public ResponseEntity<String> updateUser(@PathVariable Long id, @RequestBody Map<String, Object> request) {
        // Проверяем существование пользователя
        Optional<Users> userOptional = userRepository.findById(id);
        if (userOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }

        Users user = userOptional.get();

        // Получаем список ролей
        List<String> roleNames;
        try {
            roleNames = (List<String>) request.get("roles");
        } catch (ClassCastException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid format for roles");
        }

        if (roleNames == null || roleNames.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("No roles provided");
        }

        // Формируем новый набор ролей
        Set<Role> newRoles = new HashSet<>();
        for (String roleName : roleNames) {
            Role role = roleRepository.findByRoleName(roleName)
                    .orElseThrow(() -> new RuntimeException("Role not found: " + roleName));
            newRoles.add(role);
        }

        user.setRoles(newRoles);
        userRepository.save(user);

        return ResponseEntity.ok("User roles updated successfully");
    }




    @DeleteMapping("/users/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable Long id) {
        if (userRepository.existsById(id)) {
            userRepository.deleteById(id);
            return ResponseEntity.ok("User deleted successfully");
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
    }

    @GetMapping("/users")
    public ResponseEntity<List<Users>> getAllUsers() {
        List<Users> users = userRepository.findAll();
        return ResponseEntity.ok(users);
    }

}
