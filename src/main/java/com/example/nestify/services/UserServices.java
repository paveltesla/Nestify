package com.example.nestify.services;

import com.example.nestify.models.Users;
import com.example.nestify.repository.UserRepository;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserServices {
    private final UserRepository userRepository;

    public UserServices(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public Optional<Users> findByUsernameAndPassword(String username, String password) {
        return userRepository.findByUsernameAndPassword(username, password);
    }

    public Optional<Users> findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    public Optional<Users> findByEmailAndPassword(String email, String password) {
        return userRepository.findByEmailAndPassword(email, password);
    }

    public Optional<Users> findByEmail(String email) {
        return Optional.empty();
    }


    public List<Users> findAll() {
        return userRepository.findAll();
    }

    public Optional<Users> save(Users user) {
        return Optional.of(userRepository.save(user));
    }

    public <S extends Users> List<S> findAll(Example<S> example, Sort sort) {
        return List.of();
    }


    public void flush() {
        userRepository.flush();
    }


    public <S extends Users> S saveAndFlush(S entity) {
        return userRepository.saveAndFlush(entity);
    }

    public void deleteAllInBatch() {
        userRepository.deleteAllInBatch();
    }
}
