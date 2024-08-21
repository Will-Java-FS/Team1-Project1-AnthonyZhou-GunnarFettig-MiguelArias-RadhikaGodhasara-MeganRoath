package com.revature.models;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Data
@Table(name = "bookings")
@Getter
@Setter
public class BookingModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long bookingId;
    @Column(name = "property_id")
    private Long propertyId;
    @Column(name = "user_id")
    private Long guestId;
    @Column(name = "start_date")
    @JsonFormat(pattern="yyyy-MM-dd")
    private LocalDate startDate;
    @Column(name = "end_date")
    @JsonFormat(pattern="yyyy-MM-dd")
    private LocalDate endDate;
    @Column(nullable = false)
    private String status;

    public BookingModel(){
        //constructor
    }

    @Override
    public String toString(){
        return "Booking{ booking_id=" + bookingId +
                ", property_id:" + propertyId +
                ", guest_id:" +guestId+
                ", check in on: " + startDate+
                ", check out on" +endDate +"}";
    }

    /* NEED to reference renter's id

    //Reference properties id
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "property_id", referencedColumnName = "id")
    @JsonBackReference
    private List<Properties> properties;
     */
}