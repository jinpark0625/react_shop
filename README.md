# Happy Jolly
<img width="1304" alt="스크린샷 2023-02-20 오전 2 56 41" src="https://user-images.githubusercontent.com/69961780/220046017-7c1536c2-f7f3-4903-845b-acd6ec579a1e.png">
Happy Jolly built with React.js, Typescript, Firebase, Cloudinary, react-query, and tailwind-css, this e-commerce website allows users to log in and shop for NFTs and products. Currently, the top administrator has the ability to register new products, and all users can view and manage the products in their cart through Firebase real-time database.

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

## Key Features

- Firebase authentication for secure user log-in
- Ability for top administrator to register new products
- User cart management through Firebase real-time database
- Mobile-responsive design using tailwind-css
- Custom hooks created with react-query to efficiently fetch data and keep the user interface smooth and responsive.

### v0.1.0
- Sign up new users with email
- Update a user's profile: Users can update their profile information.
- Upload file with firebase storage
- Form validation: The application includes form validation to ensure that users provide accurate and complete information when signing up or updating their profile

### v0.2.0
- Code Refactoring and Optimization
- UI Enhancements
- Products data in Firebase storage has been updated 

<br/>

## Technical Skills

<b>Main Library</b> : React <br/>
<b>Main Language and Syntax</b> : Typescript, Javascript ES6+, JSX <br/>
<b>State Managemen</b> : useContext <br/>
<b>Server</b> : firebase <br/>
<b>UI Library</b> : Tailwind css, React-icons <br/>
<b>Others</b> : git, Babel, eslint, prettier, React-query, React-hook-form <br/>

<br/>

## Preview

### v0.1.0
| Register Page | Login required for cart |
| --- | --- |
| <img width="500" height="260" alt="1" src="https://user-images.githubusercontent.com/69961780/218193003-1dd74c69-383e-4b5d-bcdd-2adb4ae7818d.gif"> | <img width="500" height="260" alt="1" src="https://user-images.githubusercontent.com/69961780/216543388-84d313ac-4e21-4e04-b63d-be43cb2f01a6.gif"> | 
| Add cart | Add new item |
| <img width="450" height="260" alt="1" src="https://user-images.githubusercontent.com/69961780/216543412-394929af-826b-4c15-9e35-c8d090f900d5.gif"> | <img width="450" height="260" alt="1" src="https://user-images.githubusercontent.com/69961780/216533353-c1da824e-93fa-4236-a52d-fc9a21ade124.png"> | 

### v0.2.0
| Landing Page | Store Navigation |
| :---: | :---: |
| <img width="450" height="260" alt="1" src="https://user-images.githubusercontent.com/69961780/220048658-a527ff02-9028-4219-b545-55887139e331.gif"> | <img width="450" height="260" alt="1" src="https://user-images.githubusercontent.com/69961780/220048933-e72a8bc5-910a-4c4a-81f7-08ddce79e0ce.png"> | 
| Landing Page (Mobile) | Login Page |
| <img width="450" height="260" alt="1" src="https://user-images.githubusercontent.com/69961780/220049195-2f69991e-8bc3-4ecd-b1bf-144e2a51c5b5.png"> | <img width="450" height="260" alt="스크린샷 2023-02-20 오전 3 15 15" src="https://user-images.githubusercontent.com/69961780/220049749-55065938-176c-4d5a-a817-96e8e2ae8245.png"> |

## Future Development

This project is in its early stages of development, with future plans to implement additional features such as:

- ~~Membership and login through firebase storage~~
- ~~Enhance the website's UI, making it even more visually appealing and user-friendly.~~
- Get NFT Metadata and Update user's contract address
- Add Express Checkout by Paypal
