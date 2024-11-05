package com.example.nestify.controller;

import com.example.nestify.models.*;
import com.example.nestify.services.BookingService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bookings")
public class BookingController {

    private final BookingService bookingService;

    public BookingController(BookingService bookingService) {
        this.bookingService = bookingService;
    }

    @GetMapping("/user")
    public List<Booking> getUserBookings(@RequestParam Long userId) {
        return bookingService.getUserBooks(userId);
    }

    @PostMapping("/")
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
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }
}
