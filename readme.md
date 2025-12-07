Project Name: Vehicle Rental System

Live URL: https://next-level-assignment-2-steel.vercel.app

Features:
1. A User can register and login. And after login user get a token. By this token a user can access and do operation with the limited of his/her role like admin or customer.
2. In registering user. The user password is securely save in the database because it was hashed before save.
3. The admin role user can create a booking or can delete a booking
4. The admin user also can delete any user or update his booking status
5. Admin can see all the bookings and vehicles and also the customer users.
6. A customer role user can create a booking and see his booking also can update his booking
7. In customer booking total price can be less or more because it depends of the customer vehicle rent duration.

Technology Stack: 
1. Node.js
2. Express.js
3. typescript
4. tsx
5. jsonwebtoken
6. pg
7. dotenv
8. bcryptjs

Setup & Usage Instructions:
1. This server is be used by user if he has server tool like Postman or any other tool.
2. In Postman user(admin or customer) can test the route of the server.
3. Some routes are needed jwt token to access or modify which can be done by user or admin need to have the valid token after they login by the login route.
4. A user can do request like (GET, PUT, POST, DELETE) related http method to do required operation.
