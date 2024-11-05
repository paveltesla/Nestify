package com.example.nestify.controller;

import com.example.nestify.DTO.ZoneDTO;
import com.example.nestify.models.Zone;
import com.example.nestify.repository.ZoneRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/zones")
public class ZoneController {

    private final ZoneRepository zoneRepository;

    public ZoneController(ZoneRepository zoneRepository) {
        this.zoneRepository = zoneRepository;
    }

    @GetMapping("/")
    public ResponseEntity<List<ZoneDTO>> getAllZones() {
        List<Zone> zones = zoneRepository.findAll();
        List<ZoneDTO> zoneDTOs = zones.stream()
                .map(zone -> new ZoneDTO(zone.getId(), zone.getName()))
                .collect(Collectors.toList());
        return ResponseEntity.ok(zoneDTOs);
    }
}
