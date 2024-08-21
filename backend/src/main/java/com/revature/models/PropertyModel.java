package com.revature.models;

import jakarta.persistence.*;
import lombok.*;

/**
 * Represents a property entity in the database.
 * Uses JPA annotations for ORM mapping and Lombok annotations for boilerplate code reduction.
 */

@Entity
@Table(name = "properties")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class PropertyModel{

    /** @id Unique identifier for the property */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    /**
     * Many properties can be owned by one owner.
     * This represents a many-to-one relationship with the UserModel.
     * The `fetch = FetchType.EAGER` ensures that the user is loaded when the property is loaded.
     * 
     * @owner The owner of the property
     * @owner_id Foreign key in properties table from user table
     */
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id")
    private UserModel user;

    /**
     * @address Street address of the property
     */
    @Column(name = "address")
    private String address;

    /**
     * @city City where the property is located
     */
    @Column(name = "city")
    private String city;

    /**
     * @state State where the property is located
     */
    @Column(name = "state")
    private String state;

    /**
     * @zipcode Zipcode for the property's location
     */
    @Column(name = "zipcode")
    private String zipcode;

    /**
     * @description Description of the property
     */
    @Column(name = "description")
    private String description;

    /**
     * @price Price to the property per night
     */
    @Column(name = "price")
    private Double price;

    /**
     * @bedrooms Number of bedrooms in the property
     */
    @Column(name = "bedrooms")
    private Long bedrooms;

    /**
     * @bathrooms Number of bathrooms in the property
     */
    @Column(name = "bathrooms")
    private Long bathrooms;

    /**
     * @guests Maximum number of guests allowed
     */
    @Column(name = "num_of_guests")
    private Long guests;

    /**
     * @pets Indicates if pets are allowed
     */
    @Column(name = "pets")
    private Boolean pets;
}