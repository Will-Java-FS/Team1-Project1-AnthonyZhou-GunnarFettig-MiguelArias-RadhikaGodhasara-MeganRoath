package com.revature.project1;

import com.revature.models.*;
import com.revature.repositories.*;
import com.revature.services.PropertyService;
import org.junit.jupiter.api.*;
import org.mockito.*;
import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class PropertyServiceTest {

    @Mock
    private PropertyRepo propertyRepo;

    @Mock
    private UserRepo userRepo;

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
    void getAllPropertiesTest(){
        when(propertyRepo.findAll()).thenReturn(Arrays.asList(propertyModel));

        List<PropertyModel> properties = propertyService.getAllProperties();

        assertNotNull(properties);
        assertEquals(1, properties.size());
        assertEquals("123 Main St", properties.get(0).getAddress());
    }

    @Test
    void getPropertyByIdTest(){
        when(propertyRepo.findById(1L)).thenReturn(Optional.of(propertyModel));

        Optional<PropertyModel> foundProperty = propertyService.getPropertyById(1L);

        assertTrue(foundProperty.isPresent());
        assertEquals("123 Main St", foundProperty.get().getAddress());
    }

    @Test
    void createPropertyTest() {
        when(propertyRepo.save(propertyModel)).thenReturn(propertyModel);

        PropertyModel createdProperty = propertyService.createProperty(propertyModel);

        assertNotNull(createdProperty);
        assertEquals("123 Main St", createdProperty.getAddress());
        verify(propertyRepo, times(1)).save(propertyModel);
    }

    @Test
    void updatePropertyTest() {
        when(propertyRepo.existsById(1L)).thenReturn(true);
        when(propertyRepo.save(propertyModel)).thenReturn(propertyModel);

        PropertyModel updatedProperty = propertyService.updateProperty(1L, propertyModel);

        assertNotNull(updatedProperty);
        assertEquals("123 Main St", updatedProperty.getAddress());
        verify(propertyRepo, times(1)).save(propertyModel);
    }

    @Test
    void deletePropertyTest() {
        when(propertyRepo.existsById(1L)).thenReturn(true);

        boolean result = propertyService.deleteProperty(1L);

        assertTrue(result);
        verify(propertyRepo, times(1)).deleteById(1L);
    }

    @Test
    void getPropertiesByCityTest() {
        when(propertyRepo.findByCity("Springfield")).thenReturn(Arrays.asList(propertyModel));

        List<PropertyModel> properties = propertyService.getPropertiesByCity("Springfield");

        assertNotNull(properties);
        assertEquals(1, properties.size());
        assertEquals("Springfield", properties.get(0).getCity());
    }

    @Test
    void getPropertiesByStateTest() {
        when(propertyRepo.findByState("IL")).thenReturn(Arrays.asList(propertyModel));

        List<PropertyModel> properties = propertyService.getPropertiesByState("IL");

        assertNotNull(properties);
        assertEquals(1, properties.size());
        assertEquals("IL", properties.get(0).getState());
    }

    @Test
    void getPropertiesByZipcodeTest() {
        when(propertyRepo.findByZipcode("62704")).thenReturn(Arrays.asList(propertyModel));

        List<PropertyModel> properties = propertyService.getPropertiesByZipcode("62704");

        assertNotNull(properties);
        assertEquals(1, properties.size());
        assertEquals("62704", properties.get(0).getZipcode());
    }
}
