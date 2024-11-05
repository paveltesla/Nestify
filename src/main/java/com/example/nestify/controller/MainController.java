package com.example.nestify.controller;

import com.example.nestify.DTO.ZoneDTO;
import com.example.nestify.models.*;
import com.example.nestify.repository.TableRepository;
import com.example.nestify.repository.ZoneRepository;
import com.example.nestify.services.*;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api")
public class Controller {

    private final UserService userService;
    private final TableRepository tableRepository;
    private final ZoneRepository zoneRepository;
    private final BookingService bookingService;

    public Controller(UserService userService, BookingService bookingService, TableRepository tableRepository, ZoneRepository zoneRepository) {
        this.userService = userService;
        this.bookingService = bookingService;
        this.tableRepository = tableRepository;
        this.zoneRepository = zoneRepository;
    }

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody Users newUser) {
        Optional<Users> existingUser = userService.findByUsername(newUser.getUsername());
        if (existingUser.isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Username already exists");
        }
        userService.save(newUser);
        return ResponseEntity.ok("User registered successfully");
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginRequest loginRequest) {
        Optional<Users> user = userService.findByEmailAndPassword(
                loginRequest.getEmail(), loginRequest.getPassword());

        if (user.isPresent()) {
            return ResponseEntity.ok(user.get());  // Возвращаем данные пользователя
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid email or password");
        }
    }

    @GetMapping("/user")
    public List<Booking> getUserBookings(@RequestParam Long userId) {
        return bookingService.getUserBooks(userId);
    }


  @PostMapping("/bookings")
    public ResponseEntity<?> addBooking(@RequestBody BookingRequest request) {
        try {
            String message = bookingService.createBooking(
                    request.getUserId(),
                    request.getTableId(),
                    request.getPeopleCount(),
                    request.getDate(),
                    request.getTime()
            );
            return ResponseEntity.ok(message);
        } catch (IllegalArgumentException e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }


    }
    @GetMapping("/zones")
    public ResponseEntity<List<ZoneDTO>> getAllZones() {
        List<Zone> zones = zoneRepository.findAll();
        List<ZoneDTO> zoneDTOs = zones.stream()
                .map(zone -> new ZoneDTO(zone.getId(), zone.getName()))
                .collect(Collectors.toList());
        return ResponseEntity.ok(zoneDTOs);
    }

    @GetMapping("/tables")
    public ResponseEntity<List<Tables>> getTablesByZone(@RequestParam Long zoneId){
        List<Tables> tables = tableRepository.findByZoneId(zoneId);
        return ResponseEntity.ok(tables);
    }
}

