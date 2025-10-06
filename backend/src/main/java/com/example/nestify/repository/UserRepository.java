package com.example.nestify.repository;

import com.example.nestify.models.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UserRepository extends JpaRepository<Users, Long> {
    Optional<Users> findByUsernameAndPassword(String username, String password);
    Optional<Users> findByUsername(String username);
    Optional<Users> findByEmailAndPassword(String email, String password);
    Optional<Users> findByEmail(String email);
}
