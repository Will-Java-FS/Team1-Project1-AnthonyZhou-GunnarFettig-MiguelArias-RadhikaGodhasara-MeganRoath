package com.revature.models;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "properties")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class PropertyModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "owner_id", nullable = false)
    private OwnerModel ownerModel;

    @Column(name = "address", nullable = false)
    private String address;

    @Column(name = "city", nullable = false)
    private String city;

    @Column(name = "state", nullable = false)
    private String state;

    @Column(name = "zipcode", nullable = false)
    private String zipcode;

    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

    @Column(name = "price", nullable = false)
    private Double price;

    @Column(name = "bedrooms", nullable = false)
    private Long bedrooms;

    @Column(name = "bathrooms", nullable = false)
    private Long bathrooms;

    @Column(name = "num_of_guests", nullable = false)
    private Long num_of_guests;

    @Column(name = "pets")
    private Boolean pets;

    @Column(name = "available", nullable = false)
    private Boolean available;
}
