# Frontend Assessment
![frontend](https://res.cloudinary.com/drcjcovjy/image/upload/v1568943437/misc/front_nzjoba.png)

## What is this app

This app allows the user to get the information of users (habitants from now) obtained from an external API.
The user will be able to filter this information, see the details of the selected habitant, as well as create a
list of favorite habitants that will be saved on the localStorage.

## Getting Started

### Clone the repository

Clone this repository to your local machine

```bash
git clone git@github.com:sergiocrol/front-assessment.git
```

### installation

Install the dependencies

```
npm install
```

### run app

Start the application, and will be running on port 3000

```
npm start
```

## What can I do

-  **404:** As a user I can see a 404 page if I try to reach a page that does not exist so that I know it's my fault.
-  **Login:** As a user I can login to the app with my name, and this information will be saved in the localStorage.
-  **Logout:** As a user I can logout of the app, so the info will be removed from localStorage.
-  **List of habitants:** As a user I can see a paginated list of all habitants of the town.
-  **Filter search:** As a user I can filter the search in base a name, age, profession or hair color.
-  **Habitant's details:** As a user I can see the detailed information of any user.
-  **Save favorites:** As a user I can save habitants as favorites.
-  **Remove favorites:** As a user I can remove habitants from favorites.
-  **List of favorites:** As a user I can see a list of favorite users.

## Routes

| Path                      | Component            | Permissions | Behavior                                                           |
| ------------------------- | -------------------- | ----------- | -------------------------------------------------------------------|
| `/`                       | ***                  | anon/user   | Redirects the user to /welcome                                     |
| `/welcome`                | WelcomePage          | anon        | Anon user can save his name in localStorage                        |
| `/homepage`               | HomePage             | anon/user   | Any user can see/filter a list of habitants                        |
| `/favorites`              | Favorites            | anon/user   | Any user can access. Only a registered user can see/modify the info|
| `/gnomes`                 | ***                  | anon/user   | Redirects the user to /welcome                                     |
| `/gnomes/:id`             | GnomeDetail          | anon/user   | Any user can access to the detailed information of an habitant     |              

## Libraries

- **react:** v16.9.0
- **react-router-dom:** Navigation between different components
- **axios:**  Handle Ajax Requests
- **nose-sass:** Compile scss to css

## Git

[Repository Link](https://github.com/sergiocrol/front-assessment)

## Author

[Sergio Cordero Rol](https://github.com/sergiocrol)
