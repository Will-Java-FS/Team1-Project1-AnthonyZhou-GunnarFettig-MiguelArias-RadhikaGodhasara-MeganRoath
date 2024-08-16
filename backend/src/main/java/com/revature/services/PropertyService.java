// package com.revature.Service;

// public class PropertyService {
    
// }

package com.revature.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.revature.Model.PropertyModel;
import com.revature.Respository.PropertyRepo;

import java.util.List;
import java.util.Optional;

@Service
public class PropertyService {

    @Autowired
    private PropertyRepo propertyRepo;

    public PropertyService (PropertyRepo propertyRepo){
        this.propertyRepo = propertyRepo;
    }

    public List<PropertyModel> getAllProperties() {
        return propertyRepo.findAll();
    }

    public Optional<PropertyModel> getPropertyById(Long id) {
        return propertyRepo.findById(id);
    }

    public PropertyModel createProperty(PropertyModel property) {
        return propertyRepo.save(property);
    }

    public PropertyModel updateProperty(Long id, PropertyModel property) {
        if (!propertyRepo.existsById(id)) {
            return null; // or throw an exception
        }
        property.setId(id);
        return propertyRepo.save(property);
    }

    public boolean deleteProperty(Long id) {
        if (!propertyRepo.existsById(id)) {
            return false;
        }
        propertyRepo.deleteById(id);
        return true;
    }

    public List<PropertyModel> getPropertiesByCity(String city) {
        return propertyRepo.findByCity(city);
    }

    public List<PropertyModel> getPropertiesByState(String state) {
        return propertyRepo.findByState(state);
    }

    public List<PropertyModel> getPropertiesByZipcode(String zipcode) {
        return propertyRepo.findByZipcode(zipcode);
    }
}
