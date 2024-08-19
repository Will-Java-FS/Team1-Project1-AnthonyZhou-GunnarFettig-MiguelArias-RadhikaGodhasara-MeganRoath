package com.revature.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
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
    private Long booking_id;

    @Column(name = "property_id")
    private Long property_id;

//    @Column(name = "renter_id")
//    private Long guest_id;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "renter_id", referencedColumnName = "id")
    @JsonBackReference
    private RenterModel renter;

    @Column
    private LocalDate start_date;

    @Column
    private LocalDate end_date;

    @Column(nullable = false)
    private String status;

    public BookingModel(){
        //constructor
    }

    @Override
    public String toString(){
        return "Booking{ booking_id=" + booking_id +
                ", property_id:" + property_id +
                ", renter_id:" +renter.getId()+
                ", check in on: " + start_date+
                ", check out on" +end_date +"}";
    }


//    /* NEED to reference renter's id

//    Reference properties id
//    @ManyToOne(fetch = FetchType.EAGER)
//    @JoinColumn(name = "property_id", referencedColumnName = "id")
//    @JsonBackReference
//    private List<Properties> properties;

//     */
}