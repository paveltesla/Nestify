package com.example.nestify.services;

import com.example.nestify.models.Users;
import com.example.nestify.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserServices implements UserService {

    private final UserRepository userRepository;

    public UserServices(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public Optional<Users> findByUsernameAndPassword(String username, String password) {
        return userRepository.findByUsernameAndPassword(username, password);
    }

    @Override
    public Optional<Users> findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    @Override
    public Optional<Users> findByEmailAndPassword(String email, String password) {
        return userRepository.findByEmailAndPassword(email, password);
    }

    @Override
    public Optional<Users> findByEmail(String email) {
        return Optional.empty();
    }

    @Override
    public List<Users> findAll() {
        return userRepository.findAll();
    }

    @Override
    public Optional<Users> save(Users user) {
        return Optional.of(userRepository.save(user));  // Используем метод save для создания или обновления пользователя
    }
}
