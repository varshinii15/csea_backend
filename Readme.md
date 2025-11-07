# 🌐 CSEA WEBSITE API DOCUMENTATION

## 🔐 Auth Module (`api/v1/auth/`)  
Handles user registration, login, and profile management via Google OAuth.

- `POST api/v1/auth/register`
  Registers a new user via Google OAuth.

Request Body
```json
{
  "google_auth": {
    "email": "21z334psgtech.ac.in",
    "google_id_token": "<valid_google_id_token>",
    "role": "member"
  }
}
```
Success Body
```json
{
  "token": "jwt_token_here"
}
```
---
- `POST api/v1/auth/login`
  Logs in an existing user.

  Request Body
```json
{
  "google_auth": {
    "email": "csea.cse@psgtech.ac.in"
  }
}
```
Success Body
```json
{
  "token": "jwt_token_here"
}
```
---
- `GET api/v1/auth/me`
 Returns authenticated user details.

  Success Message
```json
{
  "_id": "user_id",
  "google_auth": {
    "email": "csea.cse@psgtech.ac.in",
    "role": "admin"
  }
}
```
---
- `POST api/v1/auth/logout`
Logs out the user.
  
Success Body
```json
{
  "message": "Logged out (client should delete token)"
}
```
---
- `PUT api/v1/auth/update`
Updates user details.

Request Body 
```json
{
  "google_auth": {
    "email": "csea.cse@psgtech.ac.in",
    "role": "admin"
  }
}
```
Success Body
```json
{
  "_id": "user_id",
  "google_auth": {
    "email": "csea.cse@psgtech.ac.in",
    "role": "admin"
  }
}
```
---
- `DELETE api/v1/auth/delete`
Deletes the user account.

Success Body
```json
{
  "message": "Account deleted"
}
```
---
- `GET api/v1/auth/roles`
  Lists available roles.
  
Success Body
```json
{
["admin", "member"]
}
```
---
- `POST api/v1/auth/validate`
  Validates a Google ID token and returns role.
  
  Request Body
```json
{
  "google_id_token": "valid_google_token"
}
```
Success Body
```json
{
  "email": "csea.cse@psgtech.ac.in",
  "role": "admin"
}
```
---
- `GET api/v1/auth/check/:email`
  Checks if a user is registered.
  
Success Body
```json
{
  "exists": true
}
```
---

----
## 🧭 Vertical Module (`api/v1/verticals/`)  
Manages verticals : Office bearers, Tech, Design, Publicity and Sponsorship, Content and Documentation, Events and Media

- `GET api/v1/verticals/all`
  Request Body
```json
{
  "google_auth": {
    "email": "21z334psgtech.ac.in",
    "google_id_token": "<valid_google_id_token>",
    "role": "member"
  }
}
```
Success Body
```json
{
  "token": "jwt_token_here"
}
```
---
- `POST api/v1/verticals/create`
  Request Body
```json
{
  "google_auth": {
    "email": "21z334psgtech.ac.in",
    "google_id_token": "<valid_google_id_token>",
    "role": "member"
  }
}
```
Success Body
```json
{
  "token": "jwt_token_here"
}
```
---
- `GET api/v1/verticals/:id`
  Request Body
```json
{
  "google_auth": {
    "email": "21z334psgtech.ac.in",
    "google_id_token": "<valid_google_id_token>",
    "role": "member"
  }
}
```
Success Body
```json
{
  "token": "jwt_token_here"
}
```
---
- `PUT api/v1/verticals/update/:id`
  Request Body
```json
{
  "google_auth": {
    "email": "21z334psgtech.ac.in",
    "google_id_token": "<valid_google_id_token>",
    "role": "member"
  }
}
```
Success Body
```json
{
  "token": "jwt_token_here"
}
```
---
- `DELETE api/v1/verticals/:id`
  Request Body
```json
{
  "google_auth": {
    "email": "21z334psgtech.ac.in",
    "google_id_token": "<valid_google_id_token>",
    "role": "member"
  }
}
```
Success Body
```json
{
  "token": "jwt_token_here"
}
```
---

### Sample Request: Create Vertical
```json
{
  "vertical_name": "tech"
}
```
### Response body
```json
{
  "_id": "654321abcdef",
  "vertical_name": "tech"
}
```
---
## 👥 Member Module (`api/v1/verticals/:verticalId/members/`)  
Handles member profiles within each vertical.

### Endpoints:
- `GET api/v1/verticals/:verticalId/members`  
- `POST api/v1/verticals/:verticalId/members`  
- `GET api/v1/verticals/:verticalId/members/:memberId`  
- `PUT api/v1/verticals/:verticalId/members/:memberId`  
- `DELETE api/v1/verticals/:verticalId/members/:memberId`

### Sample Request: Add Member
```json
{
  "name": "XYZ",
  "mem_role": "vertical_head",
  "mem_image": "https://example.com/image.png",
  "roll_no": "21N223"
}
```
### Response body
```json
{
  "_id": "7890abcdef123456",
  "name": "XYZ",
  "mem_role": "vertical_head",
  "mem_image": "https://example.com/image.png",
  "roll_no": "22z261"
}
```
-----
## 🎉 Event Module (`api/v1/events/`)  
Tracks events, including creation, updates, and participation.

### Endpoints:
- `GET api/v1/events`  
- `GET api/v1/events/upcoming`  
- `GET api/v1/events/past`  
- `POST api/v1/events`  
- `GET api/v1/events/:eventId`  
- `PUT api/v1/events/:eventId`  
- `DELETE api/v1/events/:eventId`

### Sample Request: Create Event
```json
{
  "title": "Tech Talk",
  "description": "Scalable backend design",
  "date": "2025-11-10T10:00:00.000Z",
  "venue": "GRD Lab",
  "created_by": "csea.cse@psgtech.ac.in",
  "participants": [
    {
      "name": "YzX",
      "email": "22n421@psgtech.ac.in"
    }
  ]
}
```
### Response body
```json
{
  "message": "Event created successfully",
  "event": {
    "_id": "event1",
    "title": "Tech Talk",
    "location": "GRD Lab"
  }
}
```





