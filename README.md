# CoffeeToGo — Final Project

## Description

CoffeeToGo is a React Native mobile application for browsing, selecting, and ordering coffee drinks.

The application allows users to browse coffee products, search and filter drinks, view product details, manage favorites, add products to a shopping cart, apply promo codes, configure delivery and payment options, place orders, and view order history.

The project uses a REST API for product data, React Navigation for application navigation, Context API for user and authentication-related state, and Redux Toolkit for shared application state such as the shopping cart, favorites, and orders.

This final project extends the functionality developed in previous assignments and focuses on creating a more complete user flow, improving navigation and UX, and adding new interactive features.

## Final Project Improvements

The existing CoffeeToGo application was analyzed and extended in several areas.

### 1. Shopping and Checkout Flow

The ordering process was expanded with:

- Promo code support
- Discount calculation
- Tax calculation after discount
- Delivery time selection
- "As soon as possible" delivery option
- Scheduled delivery time options
- Payment method selection
- Order summary
- Order confirmation
- Automatic cart clearing after a successful order
- Order history

Available payment options include:

- Card
- Apple Pay
- Google Pay
- Cash

### 2. User Profile and Authentication

The Profile section was expanded with a local authentication flow:

- Sign Up
- Log In
- Log Out
- Profile Settings
- Editable user name
- Editable user email
- Password validation
- Password visibility controls
- Guest and authenticated profile states
- My Favorites
- My Orders

The authentication implementation is intended for demonstration purposes and stores account data locally in application state during the current application session.

### 3. UX and Additional Application Sections

Several improvements were added to make the application more complete and easier to use:

- Search directly from the Home screen
- Popular products sorted by rating
- Improved Checkout interaction
- Delivery time dropdown
- Settings with interactive switches
- Expanded About Us screen
- Interactive Contact Us screen
- Email and phone links
- Social media links
- Improved navigation between Cart, Checkout, Home, Profile, and Order History

## Main User Scenarios

### Browse and Search

Users can:

- Browse coffee categories
- View popular products
- Search for products from the Home screen
- Filter products by category
- Open detailed information about a selected product

### Product Selection

On the Coffee Details screen, users can:

- View product information
- Select a coffee size
- Change quantity
- See the corresponding price
- Add the product to the cart
- Add or remove the product from favorites

### Shopping Cart

Users can:

- View products in the cart
- Change quantity
- Change product size
- Remove products
- Apply a promo code
- View subtotal, discount, tax, and total

Available demo promo codes include:

- `WELCOME10` — 10% discount
- `COFFEE15` — 15% discount
- `SAVE20` — 20% discount

### Checkout

Users can:

- Select "As soon as possible"
- Select a scheduled delivery time
- Choose a payment method
- Review products and order totals
- Place an order

After a successful order:

- The order is added to Order History
- The shopping cart is cleared
- The user is returned to the Home screen
- The Cart navigation stack is reset

### Order History

The My Orders screen displays previous orders with:

- Products
- Quantities
- Delivery option
- Payment method
- Promo code when used
- Total price
- Order date

## State Management

The application uses both Context API and Redux Toolkit.

### Context API

`UserContext` is used for user-related state.

It manages:

- User name
- User email
- Authentication state
- Local registration
- Login
- Logout
- Profile updates

Context API was selected because user information is relatively small and needs to be shared between screens such as Home, Profile, Login, Sign Up, and Profile Settings.

### Redux Toolkit

Redux Toolkit is used for application state that is shared across multiple screens and involves more application actions.

The Redux store contains:

- `cart`
- `favorites`
- `orders`

#### Cart State

The cart supports:

- Adding products
- Removing products
- Updating quantity
- Updating product size
- Updating price based on size
- Applying promo codes
- Discount calculation
- Tax calculation
- Total calculation
- Clearing the cart after an order

#### Favorites State

Favorites can be added or removed from multiple parts of the application.

Favorite state is synchronized across:

- Home
- Menu
- Category Products
- Popular Products
- Coffee Details
- Favorites

#### Orders State

Completed orders are stored in the Redux store and displayed on the My Orders screen.

New orders are added to the beginning of the order history so that the most recent order appears first.

## Navigation Structure

The application uses:

- Native Stack Navigator
- Bottom Tab Navigator
- Drawer Navigator

Navigation structure:

```text
Welcome
   ↓
Drawer Navigator
├── Home
│   └── Bottom Tab Navigator
│       ├── Home Stack
│       │   ├── Home
│       │   ├── Popular Products
│       │   ├── Category Products
│       │   └── Coffee Details
│       │
│       ├── Menu Stack
│       │   ├── Menu
│       │   ├── Category Products
│       │   └── Coffee Details
│       │
│       ├── Cart Stack
│       │   ├── Cart
│       │   └── Checkout
│       │
│       └── Profile Stack
│           ├── Profile
│           ├── Log In
│           ├── Sign Up
│           ├── Profile Settings
│           └── Order History
│
├── Favorites
├── Settings
├── About Us
└── Contact Us
```

Product information is passed between list screens and Coffee Details using navigation route parameters.

## REST API Integration

Product data is loaded from a REST API provided by MockAPI.

The API URL is stored in an environment variable and is not committed directly to the repository.

API request logic is separated into:

```text
src/api/api.js
```

Products are loaded using the Fetch API.

The application includes:

- REST API integration
- GET requests
- Loading state
- Error handling
- Dynamic product rendering
- Remote product images

If the API request fails, the application displays an error message instead of crashing.

## Key Features

- Welcome screen
- Coffee catalog
- REST API product loading
- Home product search
- Product category filtering
- Popular products
- Product details
- Small, Medium, and Large size selection
- Dynamic prices based on selected size
- Quantity selection
- Favorites
- Shopping cart
- Promo codes
- Discount calculation
- Tax calculation
- Checkout
- Delivery time selection
- Payment method selection
- Order placement
- Order history
- Sign Up
- Log In
- Log Out
- Profile Settings
- Settings
- About Us
- Contact Us
- Social media links
- Stack navigation
- Bottom Tab navigation
- Drawer navigation
- Interactive animations
- Render optimizations

## UX/UI Improvements

The final version includes several UX improvements:

- Search results are displayed directly on the Home screen
- Popular products are ordered by rating
- Favorite state is synchronized across product screens
- Selected coffee size provides animated visual feedback
- Users receive animated feedback after adding a product to the cart
- Checkout provides clear delivery and payment selections
- Scheduled delivery times are displayed in a compact dropdown
- Invalid checkout states are validated before an order can be placed
- Successful orders return the user to Home and reset the Cart flow
- Guest users see clear Log In and Sign Up actions
- Authenticated users receive access to Profile Settings, Favorites, and Orders
- Settings include interactive notification preferences
- Contact options can open external email, phone, and social applications

## Performance and Optimization

Performance improvements from previous development stages were retained in the final project.

The application uses:

- `React.memo` for reusable product cards
- `useMemo` for product filtering and derived product lists
- `useCallback` for stable callbacks
- Stable primitive image URI values
- React Native Reanimated for UI animations

`HorizontalProductCard` is wrapped with `React.memo` to reduce unnecessary re-renders when its props have not changed.

The project dependencies and production bundle were also analyzed using `depcheck` and `source-map-explorer`.

## Technologies

- React Native
- JavaScript
- React
- React Navigation
- Native Stack Navigator
- Bottom Tab Navigator
- Drawer Navigator
- Context API
- Redux Toolkit
- React Redux
- Fetch API
- MockAPI
- React Native Vector Icons
- React Native Safe Area Context
- React Native Reanimated
- react-native-dotenv

## Testing

The application was manually tested on an Android emulator.

The following functionality was verified:

- REST API product loading
- Loading and error states
- Home search
- Product category filtering
- Popular product ordering
- Product details
- Coffee size selection
- Quantity selection
- Favorites synchronization
- Adding products to the cart
- Removing products from the cart
- Updating product quantity
- Updating product size
- Promo code application
- Discount calculation
- Tax and total calculation
- Checkout navigation
- Delivery time selection
- Delivery time validation
- Payment method selection
- Order placement
- Cart clearing after successful orders
- Cart navigation reset after checkout
- Order history
- Sign Up
- Log In
- Invalid login validation
- Log Out
- Profile Settings
- Updated user information after login
- Settings switches
- About Us screen
- Contact links
- Bottom Tab navigation
- Drawer navigation
- Stack navigation
- Back navigation

The project was also checked with ESLint and completed with no errors or warnings.

## Screenshots

### Welcome

![Welcome](./src/assets/screenshots/welcome.png)

### Home

![Home](./src/assets/screenshots/home.png)

### Home Search

Search results are displayed directly on the Home screen.

![Home Search](./src/assets/screenshots/home-search.png)

### Coffee Details

![Coffee Details](./src/assets/screenshots/coffee_details.png)

### Favorites

![Favorites](./src/assets/screenshots/favorites.png)

### Cart with Promo Code

The shopping cart supports promo codes and dynamically recalculates the discount, tax, and total.

![Cart Promo](./src/assets/screenshots/cart-promo.png)

### Checkout

Users can select a delivery time and payment method before placing an order.

![Checkout](./src/assets/screenshots/checkout-final.png)

### Sign Up

![Sign Up](./src/assets/screenshots/signup.png)

### Log In

![Log In](./src/assets/screenshots/login.png)

### Profile

![Profile](./src/assets/screenshots/profile.png)

### Profile Settings

![Profile Settings](./src/assets/screenshots/profile-settings.png)

### Order History

![Order History](./src/assets/screenshots/order-history.png)

### Settings

![Settings](./src/assets/screenshots/settings.png)

### About Us

![About Us](./src/assets/screenshots/about.png)

### Contact Us

![Contact Us](./src/assets/screenshots/contact.png)

## Environment Variables

Create a `.env` file in the root of the project:

```env
API_URL=YOUR_MOCKAPI_PRODUCTS_URL
```

The `.env` file is excluded from Git using `.gitignore`.

## Run Project

Install dependencies:

```bash
npm install
```

Create the `.env` file in the project root:

```env
API_URL=YOUR_MOCKAPI_PRODUCTS_URL
```

Start Metro:

```bash
npx react-native start
```

In another terminal, run the Android application:

```bash
npx react-native run-android
```

## Project Structure

```text
src/
├── api/
├── assets/
├── components/
├── constants/
├── context/
├── navigation/
├── redux/
└── screens/
```

The project follows a modular structure:

- Reusable UI elements are separated into components
- Screen components are separated from reusable components
- Navigation configuration is separated into navigator files
- Redux logic is separated into slices
- User state is separated into Context
- API request logic is separated from UI components
- Shared colors and screen names are stored in constants

## Demo Video

A short demo demonstrating the main CoffeeToGo user flow, including product search, favorites, cart, promo codes, checkout, order history, profile management, and additional application screens.

[Watch Demo Video](./demo/CoffeeToGo_Final_Project_Demo.mp4)

## Project Presentation

[Final Project Presentation — PDF](./presentation/CoffeeToGo_Final_Project.pdf)

## Code Quality

- Modular component structure
- Reusable components
- Centralized constants
- Separated API logic
- Global state management with Redux Toolkit and Context API
- Render optimization with React hooks and `React.memo`
- Interactive animations with React Native Reanimated
- ESLint completed without errors or warnings

## Final Result

CoffeeToGo demonstrates a complete React Native mobile application flow, including REST API integration, navigation, global state management, user interaction, shopping cart functionality, checkout, local authentication, order history, animations, and performance optimization.

The final project extends the original application with additional functionality while keeping the code organized into reusable and maintainable modules.