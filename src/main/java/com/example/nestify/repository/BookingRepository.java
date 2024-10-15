package com.example.nestify.repository;

import com.example.nestify.models.Booking;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;

import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

public interface BookingRepository extends JpaRepository<Booking, Long> {
    Duration duration = Duration.ofHours(2); // Интервал в 2 часа

    @Query("""
        SELECT b
        FROM Booking b
        WHERE b.tableId = :tableId
          AND b.reservationDate = :date
          AND (
              (b.reservationTime BETWEEN :startTime AND :endTime) OR
              (:time BETWEEN b.reservationTime AND b.reservationTime + :duration)
          )
    """)
    List<Booking> findConflictingBookings(
            @Param("tableId") Long tableId,
            @Param("date") LocalDate date,
            @Param("time") LocalTime time,
            @Param("startTime") LocalTime startTime,
            @Param("endTime") LocalTime endTime,
            @Param("duration") Duration duration);
}
