package com.revature.controllers;

import com.revature.models.PropertyModel;
import com.revature.services.PropertyService;
import java.util.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;


/**
 * REST controller for managing {@link PropertyModel} entities.
 * Provides endpoints for CRUD operations and querying properties based on different criteria.
 */
@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class PropertyController {

    // Service for managing property-related operations
    @Autowired
    private PropertyService propertyService;

    /**
     * Constructor for PropertyController.
     * 
     * @param propertyService the service used to interact with property data
     */
    public PropertyController (PropertyService propertyService){
        this.propertyService = propertyService;
    }

    /**
     * Retrieves a list of all properties.
     * 
     * @return a list of {@link PropertyModel} entities
     */
    @GetMapping("/properties")
    public List<PropertyModel> getAllProperties() {
        return propertyService.getAllProperties();
    }

    /**
     * Retrieves a property by its ID.
     * 
     * @param id the ID of the property to retrieve
     * @return a ResponseEntity containing the {@link PropertyModel} if found, otherwise returns a 404 Not Found status
     */
    @GetMapping("/properties/{id}")
    public ResponseEntity<PropertyModel> getPropertyById(@PathVariable Long id) {
        Optional<PropertyModel> property = propertyService.getPropertyById(id);
        return property.map(ResponseEntity::ok)
                       .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).body(null));
    }

    /** 
     * These methods not needed as the ability to app, update, and delete properties should be limited to owners
     * 
    @PostMapping("/properties")
    public PropertyModel createProperty(@RequestBody PropertyModel property) {
        return propertyService.createProperty(property);
    }

    @PutMapping("/properties/{id}")
    public ResponseEntity<PropertyModel> updateProperty(@PathVariable Long id, @RequestBody PropertyModel property) {
        PropertyModel updatedProperty = propertyService.updateProperty(id, property);
        if (updatedProperty == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(updatedProperty);
    }

    @DeleteMapping("/properties/{id}")
    public ResponseEntity<Void> deleteProperty(@PathVariable Long id) {
        boolean isDeleted = propertyService.deleteProperty(id);
        if (!isDeleted) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.noContent().build();
    }
    */

    /**
     * Retrieves properties located in a specific city.
     * 
     * @param city the city where the properties are located
     * @return a ResponseEntity containing a list of {@link PropertyModel} entities in the specified city
     */
    @GetMapping("/cities/{city}")
    public ResponseEntity<List<PropertyModel>> getPropertiesByCity(@PathVariable String city) {
        return ResponseEntity.ok(propertyService.getPropertiesByCity(city));
    }

    /**
     * Retrieves properties located in a specific state.
     * 
     * @param state the state where the properties are located
     * @return a ResponseEntity containing a list of {@link PropertyModel} entities in the specified state
     */
    @GetMapping("/states/{state}")
    public ResponseEntity<List<PropertyModel>> getPropertiesByState(@PathVariable String state) {
        return ResponseEntity.ok(propertyService.getPropertiesByState(state));
    }

    /**
     * Retrieves properties with a specific zipcode.
     * 
     * @param zipcode the zipcode of the properties
     * @return a ResponseEntity containing a list of {@link PropertyModel} entities with the specified zipcode
     */
    @GetMapping("/zipcodes/{zipcode}")
    public ResponseEntity<List<PropertyModel>> getPropertiesByZipcode(@PathVariable String zipcode) {
        return ResponseEntity.ok(propertyService.getPropertiesByZipcode(zipcode));
    }

    /**
     * Retrieves properties owned by a specific owner.
     * 
     * @param ownerId the ID of the owner
     * @return a ResponseEntity containing a list of {@link PropertyModel} entities owned by the specified owner
     */
    @GetMapping("/owner/{ownerId}")
    public ResponseEntity<List<PropertyModel>> getPropertiesByOwner(@PathVariable Long ownerId) {
        return ResponseEntity.ok(propertyService.getPropertiesByOwnerId(ownerId));
    }

    /**
     * Adds a new property for a specific owner.
     * 
     * @param ownerId the ID of the owner
     * @param newProperty the {@link PropertyModel} entity to be added
     * @return a ResponseEntity containing the created {@link PropertyModel} and a 201 Created status if successful,
     *         otherwise a 404 Not Found status if the owner does not exist
     */
    @PostMapping("/owner/{ownerId}")
    public ResponseEntity<PropertyModel> addPropertyByOwner(@PathVariable Long ownerId, @RequestBody PropertyModel newProperty){
        try {
            PropertyModel createdProperty = propertyService.addPropertyByOwner(ownerId, newProperty);
            return new ResponseEntity<>(createdProperty, HttpStatus.CREATED);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

    /**
     * Updates a property by its ID if it belongs to a specific owner.
     * 
     * @param ownerId the ID of the owner
     * @param propertyId the ID of the property to be updated
     * @param updatedProperty the {@link PropertyModel} entity with updated information
     * @return a ResponseEntity containing the updated {@link PropertyModel} and a 200 OK status if successful,
     *         otherwise a 404 Not Found status if the property is not found or does not belong to the owner
     */
    @PutMapping("/owner/{ownerId}/property/{propertyId}")
    public ResponseEntity<PropertyModel> updatePropertyByOwner(@PathVariable Long ownerId, @PathVariable Long propertyId, @RequestBody PropertyModel updatedProperty) {
        try {
            PropertyModel updated = propertyService.updatePropertyByOwner(ownerId, propertyId, updatedProperty);
            return new ResponseEntity<>(updated, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

    /**
     * Deletes a property by its ID if it belongs to a specific owner.
     * 
     * @param ownerId the ID of the owner
     * @param propertyId the ID of the property to be deleted
     * @return a ResponseEntity with a 204 No Content status if deletion was successful,
     *         otherwise a 404 Not Found status if the property is not found or does not belong to the owner
     */
    @DeleteMapping("/owner/{ownerId}/property/{propertyId}")
    public ResponseEntity<Void> deletePropertyByOwner(@PathVariable Long ownerId, @PathVariable Long propertyId) {        
        try {
            propertyService.deletePropertyByOwner(ownerId, propertyId);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}