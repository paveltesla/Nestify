package com.example.nestify.services;

import com.example.nestify.exeption.RoleNotFoundException;
import com.example.nestify.exeption.UserNotFoundException;
import com.example.nestify.models.Role;
import com.example.nestify.models.Users;
import com.example.nestify.repository.RoleRepository;
import com.example.nestify.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class UserServices {
    @Autowired
    private UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    @Autowired
    private RoleRepository roleRepository;

    public UserServices(PasswordEncoder passwordEncoder, UserRepository userRepository) {
        this.passwordEncoder = passwordEncoder;
        this.userRepository = userRepository;
    }

    public Users register(Users user) {
        // Хешируем пароль
        String encodedPassword = passwordEncoder.encode(user.getPassword());
        user.setPassword(encodedPassword);

        // Сохраняем пользователя в базе данных
        return userRepository.save(user);
    }

    // Обновление ролей пользователя
    public void updateUserRoles(Long userId, List<String> roleNames) throws UserNotFoundException,  RoleNotFoundException {
        // Проверка существования пользователя
        Users user = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("User not found with ID: " + userId));

        // Формирование новых ролей
        Set<Role> newRoles = new HashSet<>();
        for (String roleName : roleNames) {
            Role role = roleRepository.findByRoleName(roleName)
                    .orElseThrow(() -> new RoleNotFoundException("Role not found: " + roleName));
            newRoles.add(role);
        }

        // Обновление ролей пользователя
        user.setRoles(newRoles);
        userRepository.save(user);
    }

    // Удаление пользователя
    public void deleteUser(Long userId) throws UserNotFoundException {
        Users user = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("User not found with ID: " + userId));
        userRepository.delete(user);
    }
}
