package Repositories;

import Models.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface BookingRepo extends JpaRepository<Booking, Integer> {
    List<Booking> findBookingsByProperty_Id(Integer property_id);

    @Query("select p from properties p where p.booking.id = ?1 and p.max_guests like?2")
    List<Booking> getMax(Integer booking_id, Integer max_guests);
}
