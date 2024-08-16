package com.revature.models;

import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "renters")
public class RenterModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;  // Updated to Long to match BIGINT in the database

    @OneToOne
    @JoinColumn(name = "user_id", nullable = false)
    private UserModel user;


    @OneToMany
    @JoinColumn(name = "renter_id")
    private List<BookingsModel> bookings;

    // Constructors
    public RenterModel() {}

    public RenterModel(UserModel user) {
        this.user = user;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public UserModel getUser() {
        return user;
    }

    public void setUser(UserModel user) {
        this.user = user;
    }

    public List<BookingsModel> getBookings() {
        return bookings;
    }

}