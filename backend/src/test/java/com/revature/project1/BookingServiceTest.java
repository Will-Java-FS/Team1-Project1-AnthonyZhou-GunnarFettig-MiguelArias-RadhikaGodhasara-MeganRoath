package com.revature.project1;
import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

import com.revature.models.BookingModel;
import com.revature.repositories.BookingRepo;
import com.revature.services.BookingService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;
import java.time.LocalDate;
import java.util.Optional;

@ExtendWith(MockitoExtension.class)
public class BookingServiceTest {

    @Mock
    private BookingRepo bookingRepo;

    @InjectMocks
    private BookingService bookingService;

    @Test
    public void testBookingByProperty(){
        BookingModel booking = new BookingModel();
        booking.setPropertyId(1L);

        when(bookingRepo.findByPropertyId(1L)).thenReturn(Optional.of(booking));

        BookingModel result = bookingService.getBookingByProperty(1L);
        assertNotNull(result);
        assertEquals(1L, result.getPropertyId());
    }

    @Test
    public void testDeleteBooking(){
        Long booking_id = 2L;
        BookingModel booking = new BookingModel();

        when(bookingRepo.findById(booking_id)).thenReturn(Optional.of(booking));

        bookingService.deleteBooking(booking_id);
        BookingModel deleted = bookingRepo.findById(booking_id).get();
        assertEquals(booking, deleted);
    }

    @Test
    public void testAddBookingWithConfirmed(){
        BookingModel booking = new BookingModel();
        booking.setStatus("confirmed");
        booking.setBookingId(3L);
        booking.setStartDate(LocalDate.of(2024,8,22));
        booking.setEndDate(LocalDate.of(2024,8,30));

        BookingModel result = bookingService.addBooking(booking);

        assertNull(result, "Expected: null, status is Confirmed");
    }

    @Test
    public void testAddBookingEndBeforeStartDate(){
        BookingModel booking = new BookingModel();
        booking.setStatus("pending");
        booking.setBookingId(4L);
        booking.setStartDate(LocalDate.of(2024,8,22));
        booking.setEndDate(LocalDate.of(2024,8,15));

        BookingModel result = bookingService.addBooking(booking);

        assertNull(result, "Expected: null, end date can not be before start date");
        verify(bookingRepo, never()).save(any(BookingModel.class));
    }

    @Test
    public void testAddBookingSuccessful(){
        BookingModel booking = new BookingModel();
        booking.setStatus("pending");
        booking.setBookingId(5L);
        booking.setStartDate(LocalDate.of(2024,9,1));
        booking.setEndDate(LocalDate.of(2024,9,5));

        BookingModel savedBooking = new BookingModel();
        savedBooking.setStatus("confirmed");
        savedBooking.setBookingId(5L);
        savedBooking.setStartDate(LocalDate.of(2024,9,1));
        savedBooking.setEndDate(LocalDate.of(2024,9,5));

        when(bookingRepo.save(any(BookingModel.class))).thenReturn(savedBooking);

        //check status should be confirmed
        BookingModel result = bookingService.addBooking(booking);

        assertNotNull(result);
        assertEquals("confirmed", result.getStatus(), "Expected Status: confirmed");
        verify(bookingRepo, times(1)).save(booking);
    }
}
