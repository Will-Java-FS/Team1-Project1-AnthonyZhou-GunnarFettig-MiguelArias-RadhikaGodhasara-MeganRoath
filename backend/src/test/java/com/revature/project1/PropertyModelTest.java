package com.revature.project1;

import com.revature.models.PropertyModel;
import com.revature.models.UserModel;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

public class PropertyModelTest {

    @Test
    void noArgsConstructorTest(){
        PropertyModel propertyModel = new PropertyModel();
        assertNotNull(propertyModel);
    }

    @Test
    void allArgsConstructorTest(){
        UserModel userModel = new UserModel();
        PropertyModel propertyModel = new PropertyModel(1L, userModel, "123 Main St", "Springfield", "IL", "62704", "Beautiful house", 150.0, 3L, 2L, 6L, true);

        assertEquals(1L, propertyModel.getId());
        assertEquals(userModel, propertyModel.getUser());
        assertEquals("123 Main St", propertyModel.getAddress());
        assertEquals("Springfield", propertyModel.getCity());
        assertEquals("IL", propertyModel.getState());
        assertEquals("62704", propertyModel.getZipcode());
        assertEquals("Beautiful house", propertyModel.getDescription());
        assertEquals(150.0, propertyModel.getPrice());
        assertEquals(3L, propertyModel.getBedrooms());
        assertEquals(2L, propertyModel.getBathrooms());
        assertEquals(6L, propertyModel.getGuests());
        assertTrue(propertyModel.getPets());
    }

    @Test
    void gettersAndSettersTest(){
        UserModel userModel = new UserModel();
        PropertyModel propertyModel = new PropertyModel();

        propertyModel.setId(1L);
        propertyModel.setUser(userModel);
        propertyModel.setAddress("123 Main St");
        propertyModel.setCity("Springfield");
        propertyModel.setState("IL");
        propertyModel.setZipcode("62704");
        propertyModel.setDescription("Beautiful house");
        propertyModel.setPrice(150.0);
        propertyModel.setBedrooms(3L);
        propertyModel.setBathrooms(2L);
        propertyModel.setGuests(6L);
        propertyModel.setPets(true);

        assertEquals(1L, propertyModel.getId());
        assertEquals(userModel, propertyModel.getUser());
        assertEquals("123 Main St", propertyModel.getAddress());
        assertEquals("Springfield", propertyModel.getCity());
        assertEquals("IL", propertyModel.getState());
        assertEquals("62704", propertyModel.getZipcode());
        assertEquals("Beautiful house", propertyModel.getDescription());
        assertEquals(150.0, propertyModel.getPrice());
        assertEquals(3L, propertyModel.getBedrooms());
        assertEquals(2L, propertyModel.getBathrooms());
        assertEquals(6L, propertyModel.getGuests());
        assertTrue(propertyModel.getPets());
    }

    @Test
    void equalsAndHashCodeTest() {
        UserModel user = new UserModel();
        PropertyModel property1 = new PropertyModel(1L, user, "123 Main St", "Springfield", "IL", "62704", "Beautiful house", 150.0, 3L, 2L, 6L, true);
        PropertyModel property2 = new PropertyModel(1L, user, "123 Main St", "Springfield", "IL", "62704", "Beautiful house", 150.0, 3L, 2L, 6L, true);
        PropertyModel property3 = new PropertyModel(2L, user, "456 Elm St", "Springfield", "IL", "62705", "Cozy apartment", 100.0, 2L, 1L, 4L, false);

        assertEquals(property1, property2);
        assertNotEquals(property1, property3);

        assertEquals(property1.hashCode(), property2.hashCode());
        assertNotEquals(property1.hashCode(), property3.hashCode());
    }

    @Test
    void lombokAnnotationsTest() {
        PropertyModel property = new PropertyModel();
        assertNotNull(property.toString());
        assertDoesNotThrow(() -> property.equals(new PropertyModel()));
    }
}
