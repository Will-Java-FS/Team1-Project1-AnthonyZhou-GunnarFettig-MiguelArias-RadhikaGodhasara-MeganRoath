package com.revature.controllers;

import com.revature.models.RenterModel;
import com.revature.models.UserModel;
import com.revature.services.RenterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class RenterController {
    @Autowired
    private RenterService renterService;

    // Register a new renter
    @PostMapping("/renter/register")
    public ResponseEntity<RenterModel> createRenter(@RequestBody UserModel user) {
        RenterModel renter = renterService.createRenter(user);
        return ResponseEntity.ok(renter);
    }

    // Get bookings for a specific renter
//    @GetMapping("/{renterId}/bookings")
//    public ResponseEntity<List<BookingModel>> getBookingsForRenter(@PathVariable Long renterId) {
//        List<BookingModel> bookings = renterService.getBookingsForRenter(renterId);
//        return ResponseEntity.ok(bookings);
//    }
}
