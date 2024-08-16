package com.revature.models;


import ch.qos.logback.core.model.PropertyModel;
import jakarta.persistence.*;

import java.util.List;


@Entity
@Table(name = "owners")
public class OwnerModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;  // Updated to Long to match BIGINT in the database

    @OneToOne
    @JoinColumn(name = "user_id", nullable = false)
    private UserModel user;

    @OneToMany
    @JoinColumn(name = "owner_id")
    private List<PropertyModel> properties;


    // Constructors
    public OwnerModel() {}

    public OwnerModel(UserModel user) {
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
