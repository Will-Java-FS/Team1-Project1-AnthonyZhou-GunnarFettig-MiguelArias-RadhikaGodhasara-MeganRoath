package com.revature.controllers;

import com.revature.models.BookingModel;
import com.revature.services.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class BookingController {

    //@Autowired
    private BookingService bookingService;


    @Autowired
    public BookingController(BookingService bookingService){
        this.bookingService = bookingService;
    }

    @GetMapping("/")
    public String index() {
        return "Testing Endpoints";
    }

    //Get all bookings that are available
    //had to authorize for testing
    @GetMapping("/bookings")
    public ResponseEntity<List<BookingModel>> getAllBookings(){
        List<BookingModel> bookings = bookingService.getAllBookings();
        return ResponseEntity.status(200).body(bookings);
    }
    //Probably should get mapping by status

    /*
    Handler to book a listed property by property id
    */
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
    Handler to retrieve available properties to book
    @GetMapping('/')

    Handlers to retrieve available properties by different params:
        @param: guest_id reference users(user_id)
        @param: property_id
        @param: date range
        @param: Size
        @param: Owner
     */

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
