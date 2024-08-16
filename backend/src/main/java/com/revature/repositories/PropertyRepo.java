package com.revature.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.revature.models.PropertyModel;

@Repository
public interface PropertyRepo extends JpaRepository<PropertyModel, Long> {
    List<PropertyModel> findByCity(String city);
    List<PropertyModel> findByState(String state);
    List<PropertyModel> findByZipcode(String zipcode);
}
