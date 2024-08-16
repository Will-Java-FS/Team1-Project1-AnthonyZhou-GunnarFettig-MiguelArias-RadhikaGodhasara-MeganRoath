package com.revature.repositories;

import com.revature.models.OwnerModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OwnerRepo extends JpaRepository<OwnerModel, Long> {

}
