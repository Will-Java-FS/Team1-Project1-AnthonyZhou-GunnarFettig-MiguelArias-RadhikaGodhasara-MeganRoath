package Services;
import Models.Booking;
import Repositories.BookingRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.swing.text.html.Option;
import java.time.Duration;
import java.util.List;
import java.util.Optional;

@Service
public class BookingService {
    /*
    Most likely need property repo/service
     */
    BookingRepo bookingRepo;

    @Autowired
    public BookingService(BookingRepo bookingRepo){
        this.bookingRepo = bookingRepo;
    }

    //needs to throw exceptions if outside of date range
    //throw exception if property is already booked
    public Booking addBooking(Booking booking) {
        if (booking.getEnd_date().isBefore(booking.getStart_date())) {
            return null;
        }

        int attempt = booking.getBooking_id();
        Optional<Booking> bookingAttempt = bookingRepo.findById(attempt);
        if (bookingAttempt.isPresent()) {
            return null;
        } else {
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
     */
    public Booking getBookingByGuest(int guest_id){
        //need different findby
        Optional<Booking> optionalBooking = bookingRepo.findById(guest_id);
        Booking booking = optionalBooking.get();
        return booking;
    }

    public Booking getBookingByProperty(int property_id){
        Optional<Booking> optionalBooking = bookingRepo.findById(property_id);
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

    public void deleteBooking(Integer booking_id){
        bookingRepo.deleteById(booking_id);
    }

}
