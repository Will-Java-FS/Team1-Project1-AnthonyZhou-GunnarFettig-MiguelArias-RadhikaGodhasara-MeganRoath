package com.revature.repositories;

import com.revature.models.RenterModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RenterRepo extends JpaRepository<RenterModel, Long> {

}