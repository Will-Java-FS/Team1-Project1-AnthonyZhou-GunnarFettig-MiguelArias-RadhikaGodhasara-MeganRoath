package Services;
import Models.Booking;
import Repositories.BookingRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.swing.text.html.Option;
import java.awt.print.Book;
import java.time.Duration;
import java.util.List;
import java.util.Optional;

@Service
public class BookingService {
    // Most likely need property repo/service
    @Autowired
    BookingRepo bookingRepo;

    /*
    @Autowired
    public BookingService(BookingRepo bookingRepo){
        this.bookingRepo = bookingRepo;
    }
    */

    //needs to throw exceptions if outside of date range
    //throw exception if property is already booked
    public Booking addBooking(Booking booking) {
        if((booking.getStatus().equals("confirmed")) || (booking.getEnd_date().isBefore(booking.getStart_date()))){
            return null;
        } else {
            Long attempt = booking.getBooking_id();
            Optional<Booking> bookingAttempt = bookingRepo.findById(attempt);
            booking.setStatus("confirmed");
            return bookingRepo.save(booking);
        }
    }

    /*
    Admin access should allow all bookings associated w their properties
    User should return properties associated with them
     */
    public List<Booking> getAllBookings() {
        return bookingRepo.findAll();
    }

    /*
        @param: guest_id reference users(user_id)
        @param: property_id
        @param: daterange
        @param: Size
        @param: Owner

    //Need info from property table
    public Booking getBookingByGuest(int guest_id){
        //need different findby
        Optional<Booking> optionalBooking = bookingRepo.findById(guest_id);
        Booking booking = optionalBooking.get();
        return booking;
    }
     */

    //I don't think I actually need this lol
    public Booking getBookingByProperty(Long property_id){
        Optional<Booking> optionalBooking = bookingRepo.findByProperty_id(property_id);
        Booking booking = optionalBooking.get();
        return booking;
    }

    /*
    Want to be able to search by duration
    can use Duration.between() I think

    public Booking getBookingByRange(int start_date, int end_date){
        Duration range = Duration.between(start_date, end_date);
        //
    }
     */

    public void deleteBooking(Long booking_id) {
        Optional<Booking> optionalBooking = bookingRepo.findByProperty_id(booking_id);
        if (optionalBooking.isPresent()) {
            optionalBooking.get().setStatus("cancelled");
            bookingRepo.deleteById(booking_id);
        }
    }

}
