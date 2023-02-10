# React E-commerce Website

A practice project built with React.js, Typescript, Firebase, Cloudinary, react-query, and tailwind-css, this e-commerce website allows users to log in and shop for products. Currently, the top administrator has the ability to register new products, and all users can view and manage the products in their cart through Firebase real-time database.

## table of contents

1. [Installation](#installation)
2. [Key Features](#key-features)
3. [Preview](#preview)
4. [Technical Skills](#technical-skills)
5. [Future Development](#future-development)

## Installation

```
yarn
```

## Usage

```
yarn run start
```

If you enter yarn start, your browser open http://localhost:3000/.

<br/>

## Directory Structure

```
└── src
    ├── api
    ├── components
        └── ui
    ├── context
    ├── hooks
    ├── pages
    └── services
```

<br/>

## Key Features

- Firebase authentication for secure user log-in
- Ability for top administrator to register new products
- User cart management through Firebase real-time database
- Mobile-responsive design using tailwind-css
- Custom hooks created with react-query to efficiently fetch data and keep the user interface smooth and responsive.

<br/>

## Technical Skills

<b>Main Library</b> : React <br/>
<b>Main Language and Syntax</b> : Typescript, Javascript ES6+, JSX <br/>
<b>State Managemen</b> : useContext <br/>
<b>Server</b> : firebase <br/>
<b>UI Library</b> : Tailwind css, React-icons <br/>
<b>Others</b> : git, Babel, eslint, prettier, React-query, React-hook-form <br/>

<br/>

## v0.1.0
### Features
- Sign up new users with email
- Update a user's profile: Users can update their profile information.
- Upload file with firebase storage
- Form validation: The application includes form validation to ensure that users provide accurate and complete information when signing up or updating their profile

<br/>

## Preview

- login

![login (2)](https://user-images.githubusercontent.com/69961780/216543264-d1849a74-deb9-4520-a049-d6e0c7913c6a.gif)

<br/>

- Login required for cart

![cartfailed (1)](https://user-images.githubusercontent.com/69961780/216543388-84d313ac-4e21-4e04-b63d-be43cb2f01a6.gif)

<br/>

- Add cart

![addCart (1)](https://user-images.githubusercontent.com/69961780/216543412-394929af-826b-4c15-9e35-c8d090f900d5.gif)

<br/>

- Add new item

<img width="1669" alt="addnew" src="https://user-images.githubusercontent.com/69961780/216533353-c1da824e-93fa-4236-a52d-fc9a21ade124.png">

<br/>

## Future Development

This project is in its early stages of development, with future plans to implement additional features such as:

- ~~Membership and login through firebase storage~~
- Integration with ChatGPT for enhanced user experience
- Improved product diffusion with Stable Diffusion technolog
- Enhance the website's UI, making it even more visually appealing and user-friendly.
