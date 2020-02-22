# Secret Santa Api

# Summary
This API is used to take in an array of users, shuffle them and then pair them up together as if you were picking names out of a hat. 

# Routes
## Users
  GET Req will return all users
  
  POST Req will check to see if user exists, if not, create new user
  
  GET/:id Req will return a specific user
  

## Interests
  GET/:id Req returns all interests for that user
  
  POST Req will post new interest
  
  Delete Req will delete specific interest
  
  
## Pairings
  POST Req will post all new pairings
  
  This route also connects to NodeMailer to send a confirmation email to each user
  
  GET/:poolId will return all pairs for a specific pool
  

## Pools
  POST Req will post new pool


## Verify
  PATCH Req will update a specific user's status in the pool that was created
  

# Tech
1. Postgres
2. Express
3. NodeJs
