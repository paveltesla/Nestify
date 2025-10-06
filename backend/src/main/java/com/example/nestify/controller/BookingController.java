package com.example.nestify.controller;

import com.example.nestify.models.*;
import com.example.nestify.services.BookingService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.nestify.services.UserServices;
import com.example.nestify.repository.BookingRepository;

import java.util.List;


@RestController
@RequestMapping("/api/bookings")
public class BookingController {

    private final BookingService bookingService;
    private final BookingRepository bookingRepository;

    public BookingController(BookingService bookingService, BookingRepository bookingRepository) {
        this.bookingService = bookingService;
        this.bookingRepository = bookingRepository;
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

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteBooking(@PathVariable Long id) {
        if (!bookingRepository.existsById(id)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Booking not found");
        }
        bookingRepository.deleteById(id);
        return ResponseEntity.ok("Booking deleted successfully");
    }
}
