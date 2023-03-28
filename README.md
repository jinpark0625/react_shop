# Happy Jolly

<img width="1304" alt="스크린샷 2023-02-20 오전 2 56 41" src="https://user-images.githubusercontent.com/69961780/220046017-7c1536c2-f7f3-4903-845b-acd6ec579a1e.png">
Happy Jolly is a feature-rich e-commerce website that has been built using modern web technologies such as React.js, Typescript, Firebase, Supabase, Cloudinary, PayPal, React-query, and tailwind-css. The website is designed to provide an engaging user experience for online shoppers interested in purchasing NFTs and other products. Happy Jolly offers a secure login system that enables users to create accounts and access personalized content. The site also features a robust shopping cart that allows users to add products to their cart and complete purchases with ease. Moreover, Happy Jolly offers a collection of exclusive NFTs that users can browse, buy and add to their collection. With its clean design and intuitive user interface, Happy Jolly provides a seamless online shopping experience that is both enjoyable and convenient.

## table of contents

1. [Deployed Application](#deployed-application)
2. [Key Features](#key-features)
3. [Preview](#preview)
4. [Technical Skills](#technical-skills)
5. [Future Development](#future-development)

## Deployed Application

<a href="https://happy-jolly.vercel.app/" target="_blank">Happy Jolly</a>

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

### v0.3.0

- Code Refactoring and Optimization
- Implemented product and NFT filtering options to improve user experience.
- Utilized the Infinite Scrolling technique to fetch NFT API data dynamically.
- Leveraged the Supabase platform for PostgreSQL support, enabling more advanced queries for NFT data storage compared to Firebase.
- Integrated with the OpenSea API to obtain NFT data.

### v0.4.0

- Update Edit Profile page: Users can change name, profile image, and password using Firebase Realtime Database and Auth.
- The PayPal API is used to securely process payments and confirm successful transactions. To test this feature, a PayPal developer account was used in conjunction with the PayPal sandbox to simulate transactions without incurring any real charges.
- Order History page: Users can view their past orders. The transaction details and products are stored in Firebase Realtime Database and displayed in a table format for easy viewing.

<br/>

## Technical Skills

<b>Main Library</b> : React <br/>
<b>Main Language and Syntax</b> : Typescript, Javascript ES6+, JSX <br/>
<b>State Managemen</b> : useContext <br/>
<b>Server</b> : firebase, supabase <br/>
<b>UI Library</b> : Tailwind css, React-icons <br/>
<b>Others</b> : git, Babel, eslint, prettier, React-query, React-hook-form, axios <br/>

<br/>

## Preview

### v0.1.0

<table width="100%">
  <thead>
    <tr>
      <th width="50%">Register Page</th>
      <th width="50%">Login required for cart</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="50%"><img src="https://user-images.githubusercontent.com/69961780/218193003-1dd74c69-383e-4b5d-bcdd-2adb4ae7818d.gif"/></td>
      <td width="50%"><img src="https://user-images.githubusercontent.com/69961780/216543388-84d313ac-4e21-4e04-b63d-be43cb2f01a6.gif"/></td>
    </tr>
  </tbody>
    <thead>
    <tr>
      <th width="50%">Register Page</th>
      <th width="50%">Login required for cart</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="50%"><img src="https://user-images.githubusercontent.com/69961780/216543412-394929af-826b-4c15-9e35-c8d090f900d5.gif"/></td>
      <td width="50%"><img src="https://user-images.githubusercontent.com/69961780/216533353-c1da824e-93fa-4236-a52d-fc9a21ade124.png"/></td>
    </tr>
  </tbody>
</table>

### v0.2.0

<table width="100%">
  <thead>
    <tr>
      <th width="50%">Landing Page</th>
      <th width="50%">Store Navigation</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="50%"><img src="https://user-images.githubusercontent.com/69961780/220048658-a527ff02-9028-4219-b545-55887139e331.gif"/></td>
      <td width="50%"><img src="https://user-images.githubusercontent.com/69961780/220048933-e72a8bc5-910a-4c4a-81f7-08ddce79e0ce.png"/></td>
    </tr>
  </tbody>
    <thead>
    <tr>
      <th width="50%">Landing Page (Mobile)</th>
      <th width="50%">Login Page</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="50%"><img src="https://user-images.githubusercontent.com/69961780/220049195-2f69991e-8bc3-4ecd-b1bf-144e2a51c5b5.png"/></td>
      <td width="50%"><img src="https://user-images.githubusercontent.com/69961780/220049749-55065938-176c-4d5a-a817-96e8e2ae8245.png"/></td>
    </tr>
  </tbody>
</table>

### v0.3.0

<table width="100%">
  <thead>
    <tr>
      <th width="50%">Collection Page</th>
      <th width="50%">Product Page</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="50%"><img src="https://user-images.githubusercontent.com/69961780/226156864-b156bcc8-46f7-4396-9538-aabe8e879274.png"/></td>
      <td width="50%"><img src="https://user-images.githubusercontent.com/69961780/226156884-1e6758d7-cc97-4f39-a157-7bab65dac132.gif"/></td>
    </tr>
  </tbody>
    <thead>
    <tr>
      <th width="50%">NFT Collection Page</th>
      <th width="50%">NFT Page</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="50%"><img src="https://user-images.githubusercontent.com/69961780/226156906-44750306-cc6a-4b04-9b44-d677aaa4a5d8.png"/></td>
      <td width="50%"><img src="https://user-images.githubusercontent.com/69961780/226156913-86cfb263-c68e-4fe3-9f97-cca86cb44468.gif"/></td>
    </tr>
  </tbody>
</table>

### v0.4.0

<table width="100%">
  <thead>
    <tr>
      <th width="50%">Edit Profile Page</th>
      <th width="50%">Checkout Page</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="50%"><img src="https://user-images.githubusercontent.com/69961780/228140297-f98f3b59-2b59-40a0-a0bd-32f310be42e5.png"/></td>
      <td width="50%"><img src="https://user-images.githubusercontent.com/69961780/228140849-8dfc0519-7eed-4f92-a146-2fe5c459f56b.gif"/></td>
    </tr>
  </tbody>
    <thead>
    <tr>
      <th width="50%">Order Confirmation Page</th>
      <th width="50%">Orders Page</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="50%"><img src="https://user-images.githubusercontent.com/69961780/228141066-02eb4081-62dd-4c1a-99dd-6c2a372cd716.png"/></td>
      <td width="50%"><img src="https://user-images.githubusercontent.com/69961780/228140981-5099e31d-251c-4fc4-9b94-385b67296c4e.png"/></td>
    </tr>
  </tbody>
</table>

## Future Development

This project is in its early stages of development, with future plans to implement additional features such as:

- ~~Membership and login through firebase storage~~
- ~~Edit User Profile~~
- ~~Enhance the website's UI, making it even more visually appealing and user-friendly.~~
- ~~Retrieve products and NFT data from APIs and filter by options.~~
- ~~Use the OpenSea API to retrieve NFT data and integrate Supabase for more complex queries on NFT data.~~
- ~~Add Express Checkout by Paypal~~
- Code Refactoring and Optimization
- Get NFT Metadata and Update user's contract address
