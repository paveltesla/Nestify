package com.example.nestify.controller;

import com.example.nestify.models.Tables;
import com.example.nestify.repository.TableRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tables")
public class TableController {

    private final TableRepository tableRepository;

    public TableController(TableRepository tableRepository) {
        this.tableRepository = tableRepository;
    }

    @GetMapping("/")
    public ResponseEntity<List<Tables>> getTablesByZone(@RequestParam Long zoneId) {
        List<Tables> tables = tableRepository.findByZoneId(zoneId);
        return ResponseEntity.ok(tables);
    }
}
