# Secret Santa Api

# Summary
This API is used to take in an array of users, shuffle them and then pair them up together as if you were picking names out of a hat. 

**Home** :
![alt text](https://github.com/snazzyj/SecretSanta/blob/master/images/secretsantahome.png "Home Page")

**Create a Pool**:
![alt text](https://github.com/snazzyj/SecretSanta/blob/master/images/secretsantacreate.png "Create A Pool")

**Pairs**:
![alt text](https://github.com/snazzyj/SecretSanta/blob/master/images/secretsantapairs.png "Pairs")

**Profile**:
![alt text](https://github.com/snazzyj/SecretSanta/blob/master/images/secretsantaprofile.png "Profile")

**Verification**:
![alt text](https://github.com/snazzyj/SecretSanta/blob/master/images/secretsantaverify.png "Verification")

# Routes
## Users
  URL: `https://warm-spire-44026.herokuapp.com/api/users`
  
  GET Req will return all users
  
  Response: `[{"id":1,"name":"Foo","email":"bar@gmail.com","password":"$2a$12$A7PjuGYHItLTK7svgrsPjucUakn6XCVrxop9g8EgM9jgqjP6vpnuK"}]`
  
  POST Req will check to see if user exists, if not, create new user
  
  Response: `[{"id":1,"name":"Foo","email":"bar@gmail.com","password":"$2a$12$A7PjuGYHItLTK7svgrsPjucUakn6XCVrxop9g8EgM9jgqjP6vpnuK"}]`
  
  
  GET/:id Req will return a specific user
  
  Input: `https://warm-spire-44026.herokuapp.com/api/users/1`
  
  Response: `[{"id":1,"name":"Foo","email":"bar@gmail.com","password":"$2a$12$A7PjuGYHItLTK7svgrsPjucUakn6XCVrxop9g8EgM9jgqjP6vpnuK"}]`

## Interests
  URL: `https://warm-spire-44026.herokuapp.com/api/interests/id`

  GET/:id Req returns all interests for that user
  
  Response: `[{"interest":"Candles"},{"interest":"Vinyl"},{"interest":"Chocolate"}]`
  
  POST Req will post new interest
  
  Input: `{"interest": "Pie"}`
  
  Response: `{"interest" : "Pie", "id": 1}`
  
  Delete Req will delete specific interest
  
  Input: `{"interest": "Pie"}`
  
  
## Pairings
  
  URL: `https://warm-spire-44026.herokuapp.com/api/pairings/`

  POST Req will post all new pairings -> Responds with a pool_id number which is used to retrieve all pairs
  
  Input: `"users": [
        {
            "name": "Alex",
            "email": "test@gmail.com"
        },
        {
            "name": "Foo",
            "email": "bar@gmail.com"
        }`
  
  Response: `{pool_id: 1}`
  
  This route also connects to NodeMailer to send a confirmation email to each user
   
  URL: `https://warm-spire-44026.herokuapp.com/api/pairings/1`
  GET/:poolId will return all pairs for a specific pool
  
  Response: `{[{"giftee":"Foo","gifter":"Alex","id":2,"giftee_id":1,"confirmation":false},         {"giftee":"Alex","gifter":"Foo","id":1,"giftee_id":2,"confirmation":false}]}`
  

## Pools
  
  URL: `https://warm-spire-44026.herokuapp.com/api/pools`
  
  POST Req will post new pool
  
  Input: `{pool_name: 'Test', admin_email: 'bar@gmail.com'}`
  
  Response: `{
    "pool_name": "Test",
    "admin_email": "bar@gmail.com",
    "pool_id": 2
}`
  
## Verify
  PATCH Req will update a specific user's status in the pool that was created
  

# Tech
1. Postgres
2. Express
3. NodeJs
