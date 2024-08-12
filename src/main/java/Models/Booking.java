package Models;

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
public class Booking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private Integer booking_id;
    @Column
    private Integer property_id;
    @Column
    private Integer guest_id;
    //Going off sql query; however I thought we wanted this to be a range?
    @Column
    private LocalDate start_date;
    @Column
    private LocalDate end_date;
    @Column(nullable = false)
    private String status;

    @Override
    public String toString(){
        return "Booking{ booking_id=" + booking_id +
                ", property_id:" + property_id +
                ", guest_id:" +guest_id+
                ", check in on: " + start_date+
                ", check out on" +end_date +"}";
    }

    /* NEED to reference renter's id
        Also for some reason this confuses me
        ManyToOne or ManyToMany?? idk

    //Reference properties id
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "property_id", referencedColumnName = "id")
    @JsonBackReference
    private List<Properties> properties;

     */
}
