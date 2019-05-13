
## Implemented Functionality
### Function 1 - User login and registration
Users can create accounts and subsequently login. New drops and comments would be linked to the
authenticated user.

### Function 2 - Drop creation and interaction 
Allows an authenticated user to add drops and comments to existing drops. Unauthenticated users
can view featured drops from the landing page but not comment on them. 

## Relevant URLs
[Landing page](https://info30005-2019-em.herokuapp.com/)

[Marketplace](https://info30005-2019-em.herokuapp.com/marketplace)

[Registration](https://info30005-2019-em.herokuapp.com/register)

[Sample Drop](https://info30005-2019-em.herokuapp.com/drop/5cb2c62aadcb634b48132455)

## Relevant Routes, Controllers, Models
### Accessible prior to authentication
Via [public.routes.js](routes/public.routes.js)

#### Authentication
[Auth controller](controllers/auth.controller.js)

[Account model](models/account.js)

#### Drop Viewing
[Drops controller](controllers/drops.controller.js)

[Drops model](models/drops.js)

### Accessible after authentication 
Via [protected.routes.js](routes/protected.routes.js)

#### Drop Interaction
##### Drop
[Drop controller](controllers/drops.controller.js)

[Drop model](models/drops.js)

##### Comments
[Comment controller](controllers/comments.controller.js)

[Comment model](models/comment.js)
