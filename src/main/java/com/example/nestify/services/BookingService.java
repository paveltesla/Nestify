package com.example.nestify.services;

import com.example.nestify.models.*;
import com.example.nestify.repository.*;
import org.springframework.stereotype.Service;

import java.time.*;
import java.util.List;

@Service
public class BookingService {
    private final BookingRepository bookingRepository;
    private final TableRepository tableRepository;

    public BookingService(BookingRepository bookingRepository, TableRepository tableRepository) {
        this.bookingRepository = bookingRepository;
        this.tableRepository = tableRepository;
    }

    public String createBooking(Long userID, Long tableID, int party_size, LocalDate date, LocalTime time) {
        Tables tables = tableRepository.findById(tableID).orElseThrow(() -> new IllegalArgumentException("Table Not Found"));

        LocalTime startTime = time.minusHours(2);
        LocalTime endTime = time.plusHours(2);
        List<Booking> conflictingBookings = bookingRepository.findConflictingBookings(tableID, date, time, startTime, endTime);
        if(!conflictingBookings.isEmpty()){
            throw new IllegalArgumentException("Table is already book, please select other table!");
        }
        else {
            Booking booking = new Booking();
            booking.setUser(new Users(userID));
            booking.setPartySize(party_size);
            booking.setTable(tables);
            booking.setDate(date);
            booking.setTime(time);

            bookingRepository.save(booking);
            return "Booking created!";
        }
    }
}
