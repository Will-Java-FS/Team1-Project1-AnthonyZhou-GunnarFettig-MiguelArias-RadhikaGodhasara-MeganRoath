package com.revature.repositories;

import com.revature.models.BookingModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface BookingRepo extends JpaRepository<BookingModel, Long> {
    Optional<BookingModel> findById(Long property_id);

    //Query to search properties by available guest amount
    /*
    @Query("select p from properties p where p.booking.id = ?1 and p.max_guests like?2")
    List<Booking> getMax(Long booking_id, Integer max_guests);

     */
}