package com.example.nestify.models;

import jakarta.persistence.*;
import jakarta.persistence.Table;
import org.apache.catalina.User;

import java.time.LocalDateTime;

@Entity
@Table(name = "reservation")
public class Reservation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private Users user;

    @ManyToOne
    @JoinColumn(name = "table_id")
    public Tables table;

    @Column(name = "reservation_time")
    private LocalDateTime reservationTime;



    @Column(name = "party_size")
    private Integer partySize;

    private String status;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Users getUser() {
        return user;
    }

    public void setUser(Users user) {
        this.user = user;
    }

    public Tables getTable() {
        return table;
    }

    public void setTable(Tables table) {
        this.table = table;
    }

    public LocalDateTime getReservationTime() {
        return reservationTime;
    }

    public void setReservationTime(LocalDateTime reservationTime) {
        this.reservationTime = reservationTime;
    }

    public Integer getPartySize() {
        return partySize;
    }

    public void setPartySize(Integer partySize) {
        this.partySize = partySize;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
