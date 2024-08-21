package com.revature.services;

import com.revature.models.*;
import com.revature.repositories.*;
import java.util.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


/**
 * Service class for managing {@link PropertyModel} entities.
 * Provides business logic and interactions with the data layer via {@link PropertyRepo} and {@link OwnerRepo}.
 */
@Service
public class PropertyService {

    // Repository for accessing PropertyModel entities
    @Autowired
    private PropertyRepo propertyRepo;
    // Repository for accessing OwnerModel entities
    @Autowired
    private OwnerRepo ownerRepo;

    /**
     * Constructor for PropertyService.
     * 
     * @param propertyRepo repository for PropertyModel entities
     * @param ownerRepo repository for OwnerModel entities
     */
    public PropertyService (PropertyRepo propertyRepo, OwnerRepo ownerRepo){
        this.propertyRepo = propertyRepo;
        this.ownerRepo = ownerRepo;
    }

    /**
     * Retrieves all properties from the repository.
     * 
     * @return a list of all {@link PropertyModel} entities
     */
    public List<PropertyModel> getAllProperties() {
        return propertyRepo.findAll();
    }

    /**
     * Retrieves a property by its ID.
     * 
     * @param id the ID of the property
     * @return an Optional containing the {@link PropertyModel} if found, otherwise empty
     */
    public Optional<PropertyModel> getPropertyById(Long id) {
        return propertyRepo.findById(id);
    }

    /**
     * Creates a new property in the repository.
     * 
     * @param property the {@link PropertyModel} entity to be created
     * @return the created {@link PropertyModel} entity
     */
    public PropertyModel createProperty(PropertyModel property) {
        return propertyRepo.save(property);
    }

    /**
     * Updates an existing property by its ID.
     * 
     * @param id the ID of the property to be updated
     * @param property the {@link PropertyModel} entity with updated information
     * @return the updated {@link PropertyModel} entity, or null if the property does not exist
     */
    public PropertyModel updateProperty(Long id, PropertyModel property) {

        // Return null if the property with the given ID does not exist
        if (!propertyRepo.existsById(id)) {
            return null;
        }

        property.setId(id);
        return propertyRepo.save(property);
    }

    /**
     * Deletes a property by its ID.
     * 
     * @param id the ID of the property to be deleted
     * @return true if the property was deleted successfully, false otherwise
     */
    public boolean deleteProperty(Long id) {

        // Return false if the property with the given ID does not exist
        if (!propertyRepo.existsById(id)) {
            return false;
        }

        propertyRepo.deleteById(id);
        return true;
    }

    /**
     * Retrieves properties located in a specific city.
     * 
     * @param city the city where properties are located
     * @return a list of {@link PropertyModel} entities located in the specified city
     */
    public List<PropertyModel> getPropertiesByCity(String city) {
        return propertyRepo.findByCity(city);
    }

    /**
     * Retrieves properties located in a specific state.
     * 
     * @param state the state where properties are located
     * @return a list of {@link PropertyModel} entities located in the specified state
     */
    public List<PropertyModel> getPropertiesByState(String state) {
        return propertyRepo.findByState(state);
    }

    /**
     * Retrieves properties with a specific zipcode.
     * 
     * @param zipcode the zipcode of the properties
     * @return a list of {@link PropertyModel} entities with the specified zipcode
     */
    public List<PropertyModel> getPropertiesByZipcode(String zipcode) {
        return propertyRepo.findByZipcode(zipcode);
    }

    /**
     * Retrieves properties owned by a specific owner.
     * 
     * @param ownerId the ID of the owner
     * @return a list of {@link PropertyModel} entities owned by the specified owner
     */
    public List<PropertyModel> getPropertiesByOwnerId(Long ownerId) {
        return propertyRepo.findByOwnerId(ownerId);
    }

     /**
     * Updates a property if it belongs to a specific owner.
     * 
     * @param ownerId the ID of the owner
     * @param propertyId the ID of the property to be updated
     * @param updatedProperty the {@link PropertyModel} entity with updated information
     * @return the updated {@link PropertyModel} entity
     * @throws RuntimeException if the property is not found or does not belong to the specified owner
     */
    public PropertyModel updatePropertyByOwner(Long ownerId, Long propertyId, PropertyModel updatedProperty) {

        Optional<PropertyModel> existingPropertyOptional = propertyRepo.findById(propertyId);
        PropertyModel existingProperty = existingPropertyOptional.get();

        if (existingPropertyOptional.isEmpty()) {
            throw new RuntimeException("Property not found");
        }       

        if (!existingProperty.getOwner().getId().equals(ownerId)) {
            throw new RuntimeException("Property does not belong to the specified owner");
        }

        updatedProperty.setId(propertyId);

        return updateProperty(propertyId, updatedProperty);
    }

    /**
     * Deletes a property if it belongs to a specific owner.
     * 
     * @param ownerId the ID of the owner
     * @param propertyId the ID of the property to be deleted
     * @throws RuntimeException if the property is not found or does not belong to the specified owner
     */
    public void deletePropertyByOwner(Long ownerId, Long propertyId) {

        Optional<PropertyModel> existingPropertyOptional = propertyRepo.findById(propertyId);
        PropertyModel existingProperty = existingPropertyOptional.get();

        if (existingPropertyOptional.isEmpty()) {
            throw new RuntimeException("Property not found");
        }        

        if (!existingProperty.getOwner().getId().equals(ownerId)) {
            throw new RuntimeException("Property does not belong to the specified owner");
        }

        propertyRepo.delete(existingProperty);
    }

    /**
     * Adds a new property for a specific owner.
     * 
     * @param ownerId the ID of the owner
     * @param newProperty the {@link PropertyModel} entity to be added
     * @return the saved {@link PropertyModel} entity
     * @throws RuntimeException if the owner is not found
     */
    public PropertyModel addPropertyByOwner(Long ownerId, PropertyModel newProperty) {
        Optional<OwnerModel> ownerOptional = ownerRepo.findById(ownerId);

        if (ownerOptional.isEmpty()) {
            throw new RuntimeException("Owner not found");
        }

        OwnerModel owner = ownerOptional.get();
        newProperty.setOwner(owner);

        return propertyRepo.save(newProperty);
    } 
}
