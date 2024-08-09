package Models;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

@Entity
@Table(name= "renters")
public class Renter extends UserModel {
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;

        // not sure if this is how we want to implement it.
        @OneToOne(fetch = FetchType.EAGER)
        @JoinColumn(name = "user_id")
        @JsonManagedReference
        private UserModel user;
}
