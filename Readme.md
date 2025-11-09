# 🌐 CSEA WEBSITE API DOCUMENTATION

## 🔐 Auth Module (`api/v1/auth/`)  
Handles user registration, login, and profile management via Google OAuth.

- `POST api/v1/auth/register`
  
Registers a new user via Google OAuth.

Request Body
```json
{
  "google_auth": {
    "email": "21z334@psgtech.ac.in",
    "google_id_token": "<valid_google_id_token>",
    "role": "member"
  }
}
```
Success Message
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
Success Message
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
  
Success Message
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
- `DELETE api/v1/auth/delete`
  
Deletes the user account.

Success Message
```json
{
  "message": "Account deleted"
}
```
---
- `GET api/v1/auth/roles`
  
Lists available roles.
  
Success Message
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
Success Message
```json
{
  "email": "csea.cse@psgtech.ac.in",
  "role": "admin"
}
```
---
- `GET api/v1/auth/check/:email`
  
Checks if a user is registered.
  
Success Message
```json
{
  "exists": true
}
```
----
## 🧭 Vertical Module (`api/v1/verticals/`)  
Manages verticals : Office bearers, Tech, Design, Publicity and Sponsorship, Content and Documentation, Events and Media

- `GET api/v1/verticals/all`
  
Fetches all verticals.

Success Message
```json
[
  {
    "_id": "vertical_id",
    "vertical_name": "tech"
  }
]
```
---
- `POST api/v1/verticals/create`
  
Create a new vertical.
  
Request Body
```json
{
  "vertical_name": "design"
}
```
Success Message
```json
{
  "_id": "vertical_id",
  "vertical_name": "design"
}
```
---
- `GET api/v1/verticals/:id`
  
Fetches a vertical by ID.
  
Success Message
```json
{
  "_id": "vertical_id",
  "vertical_name": "tech"
}
```
---
- `PUT api/v1/verticals/update/:id`
  
Updates a vertical.
  
Request Body
```json
{
  "vertical_name": "media"
}
```
Success Message
```json
{
  "_id": "vertical_id",
  "vertical_name": "media"
}
```
---
- `DELETE api/v1/verticals/:id`
  
Deletes a vertical.

Success Message
```json
{
  "message": "Vertical deleted successfully"
}
```
---
## 👥 Member Module (`api/v1/verticals/:verticalId/members/`)  
Handles member profiles within each vertical.

- `GET api/v1/verticals/:verticalId/members`

Fetches all members in a vertical.
 
Success Message
```json
[
  {
    "_id": "member_id",
    "name": "XYZ",
    "mem_role": "executive",
    "roll_no": "19z341",
    "vertical_id": "vertical_id"
  }
]
```
---
   
- `POST api/v1/verticals/:verticalId/members`
  
Creates a new member.

Request Body
```json
{
  "name": "XYZ",
  "vertical_id": "vertical_id",
  "mem_role": "executive",
  "roll_no": "21n401",
  "mem_image": "https://example.com/image.jpg"
}
```
Success Message
```json
{
  "_id": "member_id",
  "name": "XYZ",
  "vertical_id": "vertical_id",
  "mem_role": "executive",
  "roll_no": "21n401",
  "mem_image": "https://example.com/image.jpg"
}
```
---
- `GET api/v1/verticals/:verticalId/members/:memberId`
  
Get Member details by vertical.
  
Success Message
```json
{
  "_id": "member_id",
  "name": "XYZ",
  "vertical_id": "vertical_id",
  "mem_role": "executive",
  "roll_no": "22z333",
  "mem_image": "https://example.com/image.jpg"
}
```
---
- `PUT api/v1/verticals/:verticalId/members/:memberId`
  
Updates the member details.
  
Request Body
```json
{
  "name": "XYZ",
  "vertical_id": "vertical_id",
  "mem_role": "executive",
  "roll_no": "20n310", //roll no updated
  "mem_image": "https://example.com/image.jpg"
}
```
Success Message
```json
{
  "_id": "member_id",
  "name": "XYZ",
  "vertical_id": "vertical_id",
  "mem_role": "executive",
  "roll_no": "20n310",
  "mem_image": "https://example.com/image.jpg"
}
```
---
- `DELETE api/v1/verticals/:verticalId/members/:memberId`
  
Deletes a member.
  
Success Message
```json
{
  "message": "Member deleted"
}
```

-----
## 🎉 Event Module (`api/v1/events/`)  
Tracks events, including creation, updates, and participation.

- `GET api/v1/events`
  
Gets the details of every events
  
Success Message
```json
[
  {
    "_id": "event_id",
    "eve_name": "codenvibe",
    "startDate": "2025-09-24T10:00:00Z",
    "endDate": "2025-09-24T12:00:00Z"
  }
]
```
- `GET api/v1/events/upcoming`
  
Fetches the upcoming event details.

Success Message
```json
[
  {
    "_id": "event_id",
    "eve_name": "Tech Talk",
    "eve_descp": "A session on AI",
    "startDate": "2025-11-10T10:00:00Z",
    "endDate": "2025-11-10T12:00:00Z",
    "venueStart": "Auditorium",
    "venueEnd": "Auditorium",
    "eveimage_url": "https://example.com/image.jpg",
    "eve_reglink": "https://example.com/register"
  }
]
```
- `GET api/v1/events/past`
  
Fetches the details of past events
  
Success Message
```json
[
  {
    "_id": "event_id",
    "eve_name": "codenvibe",
    "startDate": "2025-09-24T10:00:00Z",
    "endDate": "2025-09-24T12:00:00Z"
  }
]
```
- `POST api/v1/events`
  
Creates a new event.
  
Request Body
```json
{
  "eve_name": "Ikigai in AI",
  "eve_descp": "A session on AI",
  "startDate": "2025-11-10T10:00:00Z",
  "endDate": "2025-11-10T12:00:00Z",
  "venueStart": "AIR Lab",
  "venueEnd": "SCPS Lab",
  "eveimage_url": "https://example.com/image.jpg",
  "eve_reglink": "https://example.com/register"
}
```
Success Message
```json
{
  "_id": "event_id",
  "eve_name": "Ikigai in AI",
  "eve_descp": "A session on AI",
  "startDate": "2025-11-10T10:00:00Z",
  "endDate": "2025-11-10T12:00:00Z",
  "venueStart": "AIR Lab",
  "venueEnd": "SCPS Lab",
  "eveimage_url": "https://example.com/image.jpg",
  "eve_reglink": "https://example.com/register"
}
```
- `GET api/v1/events/:eventId`
  
Fetches the events by ID

Success Message
```json
{
  "_id": "event_id",
  "eve_name": "Tech Talk",
  "eve_descp": "A session on AI",
  "startDate": "2025-11-10T10:00:00Z",
  "endDate": "2025-11-10T12:00:00Z",
  "venueStart": "Auditorium",
  "venueEnd": "Auditorium",
  "eveimage_url": "https://example.com/image.jpg",
  "eve_reglink": "https://example.com/register"
}
```
- `PUT api/v1/events/:eventId`
  
Updates the events details.
  
Request Body
```json
{
  "eve_name": "Tech Talk 2025",
  "eve_descp": "A session on emerging AI trends and applications.",
  "startDate": "2025-11-15T10:00:00Z",
  "endDate": "2025-11-15T12:00:00Z",
  "venueStart": "Main Auditorium",
  "venueEnd": "Main Auditorium",
  "eveimage_url": "https://example.com/images/techtalk2025.jpg",
  "eve_reglink": "https://example.com/register/techtalk2025"
}
```
Success Message
```json
{
  "_id": "event_id",
  "eve_name": "Updated Event Name",
  "eve_descp": "Updated description",
  "startDate": "2025-11-15T10:00:00Z",
  "endDate": "2025-11-15T12:00:00Z",
  "venueStart": "Main Hall",
  "venueEnd": "Main Hall",
  "eveimage_url": "https://example.com/updated-image.jpg",
  "eve_reglink": "https://example.com/updated-register"
}
```
- `DELETE api/v1/events/:eventId`

Success Message
```json
{
  "message": "Event deleted successfully"
}
```







