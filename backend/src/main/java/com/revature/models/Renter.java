package com.revature.models;

import jakarta.persistence.*;

@Entity
@Table(name = "renters")
public class Renter {

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;  // Updated to Long to match BIGINT in the database

        @ManyToOne
        @JoinColumn(name = "user_id", nullable = false)
        private User user;

        // Constructors
        public Renter() {}

        public Renter(User user) {
                this.user = user;
        }

        // Getters and Setters
        public Long getId() {
                return id;
        }

        public void setId(Long id) {
                this.id = id;
        }

        public User getUser() {
                return user;
        }

        public void setUser(User user) {
                this.user = user;
        }
}
