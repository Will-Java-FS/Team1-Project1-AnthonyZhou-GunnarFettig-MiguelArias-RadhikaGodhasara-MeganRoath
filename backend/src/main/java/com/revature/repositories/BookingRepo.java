package com.revature.repositories;

import com.revature.models.BookingModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface BookingRepo extends JpaRepository<BookingModel, Long> {
    //Optional<BookingModel> findByPropertyId(Long property_id);
    @Query("SELECT b FROM BookingModel b WHERE b.property_id = :property_id")
    Optional<BookingModel> findByPropertyId(@Param("property_id") Long property_id);
}