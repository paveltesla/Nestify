package com.example.nestify.services;

import com.example.nestify.models.Users;
import java.util.*;

public interface UserService {
    Optional<Users> findByUsernameAndPassword(String username, String password);

    Optional<Users> findByUsername(String username);

    Optional<Users> findByEmailAndPassword(String email, String password);

    Optional<Users> findByEmail(String email);

    List<Users> findAll();

    Optional<Users> save(Users user);
}
