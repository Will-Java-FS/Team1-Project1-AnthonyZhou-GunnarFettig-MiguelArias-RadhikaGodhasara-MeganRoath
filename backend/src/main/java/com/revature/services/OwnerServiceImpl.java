package com.revature.services;

import com.revature.models.OwnerModel;
import com.revature.models.RenterModel;
import com.revature.models.UserModel;
import com.revature.repositories.OwnerRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OwnerServiceImpl implements OwnerService {

    @Autowired
    private OwnerRepo ownerRepo;

    @Override
    public RenterModel createOwner(UserModel user) {
        return null;
    }

//    public List<PropertyModel> getPropertiesForOwner(Long ownerId) {
//        OwnerModel owner = getOwnerById(ownerId);
//        return ownerRepo.getProperties(owner);
//    }
}
