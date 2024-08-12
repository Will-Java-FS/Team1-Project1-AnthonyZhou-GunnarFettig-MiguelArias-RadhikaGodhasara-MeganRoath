package Controllers;
import Models.Booking;
import Services.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class BookingController {
    @Autowired
    private BookingService bookingService;
    /*
    Handler to book a listed property by property id
    */
    @PostMapping("/bookings")
    public ResponseEntity<String> addBooking(@RequestParam Booking booking){
        Booking booked = bookingService.addBooking(booking);

        return ResponseEntity.status(200).body("Booking successful for:" + booked.toString());
    }

/*
    Handler to retrieve available properties to book
    @GetMapping('/')

    Handlers to retrieve available properties by different params:
        @param: guest_id reference users(user_id)
        @param: property_id
        @param: daterange
        @param: Size
        @param: Owner
     */
}
