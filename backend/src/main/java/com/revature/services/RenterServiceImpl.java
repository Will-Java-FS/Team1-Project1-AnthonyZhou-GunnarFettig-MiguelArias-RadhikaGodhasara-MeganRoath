package com.revature.services;

//import com.revature.models.BookingsModel;
import com.revature.models.RenterModel;
import com.revature.models.UserModel;
import com.revature.repositories.RenterRepo;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
public class RenterServiceImpl implements RenterService{
    RenterRepo renterRepo;
    @Override
    public RenterModel createRenter(UserModel user){
        RenterModel renter = new RenterModel(user);
        return renterRepo.save(renter);
    }
//    @Override
//    public List<BookingsModel> getBookings(long id){
//        RenterModel renter = renterRepo.findById(id).get();
//        return renter.getBookings();
//    }
}
