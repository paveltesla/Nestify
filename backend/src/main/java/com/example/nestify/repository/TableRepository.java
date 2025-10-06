package com.example.nestify.repository;

import com.example.nestify.models.Tables;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TableRepository extends JpaRepository<Tables, Long> {
    List<Tables> findByZoneId(Long zoneId);
}
