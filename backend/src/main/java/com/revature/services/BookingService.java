package com.revature.services;

import com.revature.models.BookingModel;
import com.revature.repositories.BookingRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BookingService {

    @Autowired
    private BookingRepo bookingRepo;

    public BookingService(BookingRepo bookingRepo){
        this.bookingRepo = bookingRepo;
    }


    //needs to throw exceptions if outside of date range
    //throw exception if property is already booked
    public BookingModel addBooking(BookingModel booking) {
        if((booking.getStatus().equals("confirmed")) || (booking.getEndDate().isBefore(booking.getStartDate()))){
            return null;
        } else {
            Long attempt = booking.getBookingId();
            Optional<BookingModel> bookingAttempt = bookingRepo.findById(attempt);
            booking.setStatus("confirmed");
            return bookingRepo.save(booking);
        }
    }

    public List<BookingModel> getAllBookings() {
        return bookingRepo.findAll();
    }

    /*
        @param: guest_id reference users(user_id)
        @param: property_id
        @param: date range
        @param: Size
        @param: Owner
     */

    public BookingModel getBookingByProperty(Long property_id){
        Optional<BookingModel> optionalBooking = bookingRepo.findByPropertyId(property_id);
            BookingModel booking = optionalBooking.get();
            return booking;
    }

    public void deleteBooking(Long booking_id) {
        Optional<BookingModel> optionalBooking = bookingRepo.findById(booking_id);
        if (optionalBooking.isPresent()) {
            optionalBooking.get().setStatus("cancelled");
            bookingRepo.deleteById(booking_id);
        }
    }

}
