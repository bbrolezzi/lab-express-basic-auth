X - User model

The views

X - Home - Display welcome message. -> index.hbs -> need to style it
X - Sign Up - Allows new users to create an account.
Sign In - Allows existing users to sign in to their account.
Private - Displays user information to signed in user.

The routes

GET - / - Home view
GET - /authentication/sign-up - Display sign up view
POST - /authentication/sign-up - Handle sign up form submission
GET - /authentication/sign-in - Display sign in view
POST - /authentication/sign-in - Handle sign in form submission
POST - /authentication/sign-out - Sign out the user
GET - /authentication/private - Display private view
BONUS
GET - /authentication/profile - Display user profile
GET - /authentication/profile/edit - Allows the user to edit it's info
POST - /authentication/profile/edit - Submit the changes on the database
