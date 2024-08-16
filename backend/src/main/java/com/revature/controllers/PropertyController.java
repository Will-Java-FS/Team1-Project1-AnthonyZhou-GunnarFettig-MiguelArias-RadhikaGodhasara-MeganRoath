package com.revature.controllers;

import com.revature.models.PropertyModel;
import com.revature.services.PropertyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
public class PropertyController {

    @Autowired
    private PropertyService propertyService;

    public PropertyController (PropertyService propertyService){
        this.propertyService = propertyService;
    }

    @GetMapping("/properties")
    public List<PropertyModel> getAllProperties() {
        return propertyService.getAllProperties();
    }

    @GetMapping("properties/{id}")
    public ResponseEntity<PropertyModel> getPropertyById(@PathVariable Long id) {
        Optional<PropertyModel> property = propertyService.getPropertyById(id);
        return property.map(ResponseEntity::ok)
                       .orElseGet(() -> ResponseEntity.notFound().build());
    }

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

    @GetMapping("/cities/{city}")
    public List<PropertyModel> getPropertiesByCity(@PathVariable String city) {
        return propertyService.getPropertiesByCity(city);
    }

    @GetMapping("/states/{state}")
    public List<PropertyModel> getPropertiesByState(@PathVariable String state) {
        return propertyService.getPropertiesByState(state);
    }

    @GetMapping("/zipcodes/{zipcode}")
    public List<PropertyModel> getPropertiesByZipcode(@PathVariable String zipcode) {
        return propertyService.getPropertiesByZipcode(zipcode);
    }
}