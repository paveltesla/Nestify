package com.example.nestify.models;

import jakarta.persistence.*;
import jakarta.persistence.Table;

import java.util.List;

@Entity
@Table(name = "zones")
public class Zone {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="name", nullable=false)
    private String name;

    @OneToMany(mappedBy = "zone", cascade = CascadeType.ALL)
    private List<Tables> tables;

    public void setId(Long id) {
        this.id = id;
    }

    public List<Tables> getTables() {
        return tables;
    }

    public void setTables(List<Tables> tables) {
        this.tables = tables;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Long getId() {
        return id;
    }
}
