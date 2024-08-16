// package com.revature.Respository;

// public class PropertyRepo {
    
// }

package com.revature.Respository;

import java.util.List;

import com.revature.models.PropertyModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PropertyRepo extends JpaRepository<PropertyModel, Long> {
    List<PropertyModel> findByCity(String city);
    List<PropertyModel> findByState(String state);
    List<PropertyModel> findByZipcode(String zipcode);
}
