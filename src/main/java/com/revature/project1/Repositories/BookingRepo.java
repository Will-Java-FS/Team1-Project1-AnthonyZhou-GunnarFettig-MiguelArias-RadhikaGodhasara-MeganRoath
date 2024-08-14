package com.revature.project1.Repositories;

import com.revature.project1.Models.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BookingRepo extends JpaRepository<Booking, Long> {
    Optional<Booking> findById(Long property_id);

    //Query to search properties by available guest amount
    /*
    @Query("select p from properties p where p.booking.id = ?1 and p.max_guests like?2")
    List<Booking> getMax(Long booking_id, Integer max_guests);

     */
}
