# Middleware

Purpose: 
1. The protect midlleware is used to protect routes.
2. It ensures that only authenticated users can access certain endpoints.
3. It extracts and verifies a JWT token sent by the client and attaches the user info to the request.

* Verify the token : jwt.verify(token, process.env.JWT_SECRET);

1. it parses the token and return the payload.

1. Checks signature using your secret (JWT_SECRET).
2. Decodes the payload if valid.

now variable "decoded" conatains whatever info you put in the token when signing it.

example: { id: "userId123", iat: 1694100000, exp: 1694103600 }
