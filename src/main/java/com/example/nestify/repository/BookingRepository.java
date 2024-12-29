package com.example.nestify.repository;

import com.example.nestify.models.Booking;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

public interface BookingRepository extends JpaRepository<Booking, Long> {

    @Query("""
    SELECT b FROM Booking b WHERE b.user.id = :userId
""")
    List<Booking> getUserBooks(@Param("userId")Long userId);

    @Query("""
    SELECT b
    FROM Booking b
    WHERE b.table.id = :tableId
      AND b.date = :date
      AND (
          (b.time BETWEEN :startTime AND :endTime) OR
          (:startTime BETWEEN b.time AND b.time) OR
          (:endTime BETWEEN b.time AND b.time)
      )
""")

    List<Booking> findConflictingBookings(
            @Param("tableId") Long tableId,
            @Param("date") LocalDate date,
            @Param("startTime") LocalTime startTime,
            @Param("endTime") LocalTime endTime
    );

}
