package com.revature.services;

import com.revature.models.BookingsModel;
import com.revature.models.RenterModel;
import com.revature.models.UserModel;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface RenterService {
    public RenterModel createRenter(UserModel user);
    public List<BookingsModel> getBookings(long id);
}
