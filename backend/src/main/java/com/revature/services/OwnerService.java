package com.revature.services;

import com.revature.models.RenterModel;
import com.revature.models.UserModel;
import org.springframework.stereotype.Service;

//import java.util.List;

@Service
public interface OwnerService {
    public RenterModel createOwner(UserModel user);
//    public List<PropertyModel> getBookingsForOwner(OwnerModel owner);
}
