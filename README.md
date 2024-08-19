# Project 1
## Property Booking Application - Technology Project
The Property Booking technology project entails developing a comprehensive full-stack application utilizing Spring Boot and React, aimed at facilitating property bookings akin to platforms such as AirBNB. The Minimum Viable Product (MVP) includes essential user stories ranging from account creation and authentication to property browsing and booking functionalities. User roles, including owners and renters, each have distinct capabilities such as property management and booking history tracking. Additionally, the entity-relationship model outlines core entities like User, Renter, Owner, Property, and Booking, establishing a robust foundation for the application's data structure and functionality.

## Some User Stories
- Create an account for renter
- Create an account for owner
- Log into the account

- List a property for rent 
    endpoint - post on "/properties"
    json body
    {
      "ownerID": 1,
      "address": "123 street address",
      "city": "Bethelhem",
      "state": "PA",
      "zipcode": "28394",
      "price": 99.99,
      "bedrooms": 2,
      "bathrooms": 1,
      "numOfGuests": 2,
      "available": true
    }

- View all listed properties
endpoint - get on "/properties"

- View a specific property by ID
endpoint - get on "properties/{id}"

- View list of properties by state
endpoint - get on "/states/{state}"

- View list of properties by city
endpoint - get on "/cities/{city}"

- View list of properties by zipcodes
endpoint - get on "/zipcodes/{zipcode}"

- Update a property by ID
endpoint - patch on "properties/{id}"
{
    "ownerID": 1,
    "address": "123 street address",
    "city": "Bethelhem",
    "state": "PA",
    "zipcode": "28394",
    "price": 99.99,
    "bedrooms": 2,
    "bathrooms": 1,
    "numOfGuests": 2,
    "available": true
}

- Delete a property
endpoint - delete on "properties/{id}"

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

