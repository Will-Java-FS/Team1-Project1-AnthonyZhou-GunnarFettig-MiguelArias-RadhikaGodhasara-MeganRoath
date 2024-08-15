# Project 1
## Property Booking Application - Technology Project
The Property Booking technology project entails developing a comprehensive full-stack application utilizing Spring Boot and React, aimed at facilitating property bookings akin to platforms such as AirBNB. The Minimum Viable Product (MVP) includes essential user stories ranging from account creation and authentication to property browsing and booking functionalities. User roles, including owners and renters, each have distinct capabilities such as property management and booking history tracking. Additionally, the entity-relationship model outlines core entities like User, Renter, Owner, Property, and Booking, establishing a robust foundation for the application's data structure and functionality.

## Some User Stories
- Create an account for renter
- Create an account for owner
- Log into the account
- List a property for rent
- View all listed properties
- View a specific property
- Update a property
- Delete a property
- Create a booking
- View all bookings for a user
- View a specific property for a user
- Cancle/Delete a booking
- Change/Update a booking

- to register user
- Post - http://localhost:8080/register
- json body
- {
  "username": "username",
  "email": "uniqueEmailHere@example.com",
  "passwordHash": "yourPassword",
  "firstName": "firstname",
  "lastName": "Lastname"

}

- to login
- Post http://localhost:8080/authenticate

- json body
- {
  "username": "username",
  "passwordHash": "password"

}
you should receive a bearer token in the responce, you can set it in postman and access other locked endpoints when set. 

