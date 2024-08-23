package com.revature.project1;

import com.revature.models.*;
import com.revature.repositories.PropertyRepo;
import com.revature.services.PropertyService;
import org.junit.jupiter.api.*;
import org.mockito.*;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.context.SpringBootTest;
import java.util.*;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.when;

@SpringBootTest
public class PropertyRepoTest {

    @Mock
    private PropertyRepo propertyRepo;

    @InjectMocks
    private PropertyService propertyService;

    private PropertyModel propertyModel;
    private UserModel userModel;

    @BeforeEach
    public void beforeEach(){
        MockitoAnnotations.openMocks(this);

        userModel = new UserModel("user1", "user1@email.com", "pass1", "user", "one", "owner");
        propertyModel = new PropertyModel(1L, userModel, "123 Main St", "Springfield", "IL", "62704", "Beautiful house", 150.0, 3L, 2L, 6L, true);
    }

    @Test
    void findByCityTest(){
        when(propertyRepo.findByCity("Springfield")).thenReturn(Arrays.asList(propertyModel));

        List<PropertyModel> properties = propertyRepo.findByCity("Springfield");

        assertNotNull(properties);
        assertEquals(1, properties.size());
        assertEquals("Springfield", properties.get(0).getCity());
    }

    @Test
    void findByStateTest(){
        when(propertyRepo.findByState("IL")).thenReturn(Arrays.asList(propertyModel));

        List<PropertyModel> properties = propertyRepo.findByState("IL");

        assertNotNull(properties);
        assertEquals(1, properties.size());
        assertEquals("IL", properties.get(0).getState());
    }

    @Test
    void findByZipcodeTest(){
        when(propertyRepo.findByZipcode("62704")).thenReturn(Arrays.asList(propertyModel));

        List<PropertyModel> properties = propertyRepo.findByZipcode("62704");

        assertNotNull(properties);
        assertEquals(1, properties.size());
        assertEquals("62704", properties.get(0).getZipcode());
    }

    @Test
    void findByUserTest(){
        when(propertyRepo.findByUser(userModel)).thenReturn(Arrays.asList(propertyModel));

        List<PropertyModel> properties = propertyRepo.findByUser(userModel);

        assertNotNull(properties);
        assertEquals(1, properties.size());
        assertEquals(userModel, properties.get(0).getUser());
    }
}
