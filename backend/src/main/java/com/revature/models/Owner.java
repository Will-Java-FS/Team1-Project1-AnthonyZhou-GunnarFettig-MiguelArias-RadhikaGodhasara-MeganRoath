package com.revature.models;


import jakarta.persistence.*;


@Entity
@Table(name = "owners")
public class Owner {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;  // Updated to Long to match BIGINT in the database

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private UserModel user;

    // Constructors
    public Owner() {}

    public Owner(UserModel user) {
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
}
