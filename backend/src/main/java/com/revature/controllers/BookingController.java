package com.revature.controllers;

import com.revature.models.BookingModel;
import com.revature.services.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.function.LongFunction;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class BookingController {

    private BookingService bookingService;

    @Autowired
    public BookingController(BookingService bookingService){
        this.bookingService = bookingService;
    }

    @GetMapping("/bookings")
    public ResponseEntity<List<BookingModel>> getAllBookings(){
        List<BookingModel> bookings = bookingService.getAllBookings();
        return ResponseEntity.status(200).body(bookings);
    }

    //Handler to book a listed property by property id
    @PostMapping("/bookings")
    public ResponseEntity<String> addBooking(@RequestParam BookingModel booking){
        //Check if property is already booked for input dates
        if(booking.getStatus().equals("confirmed")){
            return ResponseEntity.status(400).body("Booking details unavailable.");
        } else {
            BookingModel booked = bookingService.addBooking(booking);

            return ResponseEntity.status(200).body("Booking successful for:" + booked.toString());
        }
    }

/*
    Handlers to retrieve available properties by different params:
        @param: guest_id reference users(user_id)
        @param: property_id
        @param: date range
        @param: Size
        @param: Owner
     */

    @GetMapping("/bookings/{property_id}")
    public ResponseEntity<String> getPropertyByID(@RequestParam Long property_id){
        BookingModel property = bookingService.getBookingByProperty(property_id);
        if(property == null){
            return ResponseEntity.status(404).body("No property found for given id.");
        }
        return ResponseEntity.status(200).body(property.toString());
    }

    @DeleteMapping("/bookings")
    public ResponseEntity<String> deleteBooking(@RequestParam BookingModel booking){
        if(booking.getStatus().equals("cancelled")){
            return ResponseEntity.status(409).body("Booking was previously cancelled.");
        } else {
            Long tryId = booking.getBooking_id();
            bookingService.deleteBooking(tryId);
            return ResponseEntity.status(200).body("Booking cancelled successfully.");
        }
    }
}
