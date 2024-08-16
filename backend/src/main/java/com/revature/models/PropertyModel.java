package com.revature.models;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "properties")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class PropertyModel{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // @OneToMany(fetch = FetchType.EAGER)
    @Column(name = "owner_id")
    private Long ownerID;

    @Column(name = "address")
    private String address;

    @Column(name = "city")
    private String city;

    @Column(name = "state")
    private String state;

    @Column(name = "zipcode")
    private String zipcode;

    @Column(name = "description")
    private String description;

    @Column(name = "price")
    private Double price;

    @Column(name = "bedrooms")
    private Long bedrooms;

    @Column(name = "bathrooms")
    private Long bathrooms;

    @Column(name = "num_of_guests")
    private Long numOfGuests;

    @Column(name = "pets")
    private Boolean pets;

    @Column(name = "available")
    private Boolean available;
}
