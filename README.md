# Cross Assignment 7

## Description

CoffeeToGo is a React Native coffee shop application.

The application uses Stack Navigator, Bottom Tab Navigator, and Drawer Navigator for navigation. Product data is loaded from a REST API using the Fetch API and displayed dynamically throughout the application.

This version of the project focuses on animations, performance optimization, render optimization, dependency analysis, and bundle analysis.

The application also uses Context API for user profile information and Redux Toolkit for shopping cart and favorite products.

The project includes REST API integration, product filtering, search, cart management, favorites, product details, checkout functionality, animations, and performance optimizations.

## Global State Management

The application uses two approaches for global state management:

- Context API — user profile data
- Redux Toolkit — shopping cart and favorite products

### Context API

User profile information is managed using `UserContext`.

The context stores:

- User name
- User email

`UserProvider` wraps the application and provides the user state and the `updateUser` function to other components.

The Profile screen allows the user to update profile information. The updated name is also displayed on the Home screen.

This demonstrates sharing and updating global state between multiple components using Context API.

### Redux Toolkit

Redux Toolkit is used to manage the shopping cart and favorite products.

The Redux store contains:

- `cart`
- `favorites`

The application uses:

- `configureStore`
- `createSlice`
- `Provider`
- `useSelector`
- `useDispatch`

### Cart State

The cart is managed through `cartSlice`.

Available cart operations include:

- Add a product
- Remove a product
- Update product quantity
- Update selected product size
- Update the price when the selected size changes
- Calculate subtotal, tax, and total

Cart state is shared between the Coffee Details, Cart, and Checkout screens.

### Favorites State

Favorite products are managed through `favoritesSlice`.

Users can:

- Add a product to favorites
- Remove a product from favorites
- See the active favorite state using a filled heart icon
- Access favorite products from the Favorites screen

Favorite state is synchronized across multiple screens, including:

- Home
- Menu
- Category Products
- Popular Products
- Coffee Details
- Favorites

The Favorites screen can be accessed from the Drawer menu and from the Profile screen.

## Navigation Structure

The application uses several navigation types:

- Stack Navigator
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
│       ├── Menu Stack
│       │   ├── Menu
│       │   ├── Category Products
│       │   └── Coffee Details
│       ├── Cart Stack
│       │   ├── Cart
│       │   └── Checkout
│       └── Profile
├── Favorites
├── Settings
├── About Us
└── Contact Us
```

## Features

- Welcome screen
- Home screen
- User profile
- Editable user name and email
- Global user state with Context API
- Coffee menu
- Coffee details
- REST API integration
- Product data loading from MockAPI
- GET requests using Fetch API
- Products displayed using FlatList
- Loading indicator while fetching data
- Error handling for failed API requests
- Popular products
- Product filtering by category
- Search filtering on category and popular product screens
- Hot, Cold, and Iced coffee categories
- Navigation from categories to filtered product lists
- Navigation from product lists to Coffee Details
- Remote product images loaded from API
- Product size selection
- Different prices for Small, Medium, and Large drinks
- Product quantity selection
- Global cart state with Redux Toolkit
- Add products to cart
- Remove products from cart
- Update product quantity in cart
- Update product size in cart
- Cart subtotal, tax, and total calculation
- Favorites management with Redux Toolkit
- Add and remove favorite products
- Synchronized favorite state across screens
- Favorites screen
- Checkout screen
- Bottom Tab navigation
- Drawer navigation
- Stack navigation
- Custom navigation headers
- Navigation icons
- Back navigation
- Drawer swipe gesture
- Product ID and product data passing between screens
- Animated coffee size selection with React Native Reanimated
- Animated "Added to cart" feedback
- Product card render optimization with `React.memo`
- Product filtering optimization with `useMemo`
- Stable callbacks with `useCallback`
- Dependency analysis with `depcheck`
- Production bundle analysis with `source-map-explorer`

## API Integration

Product data is loaded from a REST API provided by MockAPI.

The API URL is stored in an environment variable and is not committed directly to the repository.

The API request logic is separated into:

```text
src/api/api.js
```

Products are loaded using a GET request with the Fetch API:

```js
import { API_URL } from '@env';

// GET request to load all coffee products from MockAPI

export const fetchProducts = async () => {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }

  const data = await response.json();

  return data;
};
```

The received data is stored in component state using `useState`.

`useEffect` is used to load products when the relevant screen is opened.

## Context API Structure

The user context is located in:

```text
src/context/UserContext.jsx
```

`UserContext` provides global user information and a function for updating it.

The context is used by multiple screens, including:

- Profile
- Home

This allows profile information changed on the Profile screen to be immediately available on the Home screen.

## Redux Structure

Redux-related files are separated into:

```text
src/redux/
├── store.js
├── cartSlice.js
└── favoritesSlice.js
```

The Redux store is configured using `configureStore`.

The application is wrapped with the Redux `Provider`, allowing screens and components to access global Redux state.

`useSelector` is used to read state, while `useDispatch` is used to dispatch Redux actions.

## Product List

Products received from the API are displayed using React Native `FlatList`.

The product list uses:

- `data` for API products
- `renderItem` to render product cards
- `keyExtractor` for list item keys
- `HorizontalProductCard` as a reusable custom component
- `VerticalProductCard` for product presentation on the Home screen

Dynamic data and favorite state are passed to reusable product cards through props.

Each product can be selected to open the Coffee Details screen.

## Loading and Error Handling

While product data is being loaded, the application displays an `ActivityIndicator`.

If the API request fails, the application displays:

```text
Failed to load products
```

This prevents the application from crashing when the API or network is unavailable.

## Data Passing

When a product is selected, its ID and product data are passed to the Coffee Details screen:

```js
navigation.navigate(SCREENS.COFFEE_DETAILS, {
  productId: item.id,
  product: item,
});
```

The product data is received on the Coffee Details screen using route parameters:

```js
const { product } = route.params || {};
```

If product data is missing, the application displays:

```text
Product not found
```

instead of crashing.

## Assignment 7 — Animation and Performance Optimization

### Task 1. Performance Analysis

The application was analyzed to identify components that could benefit from animation and performance optimization.

- `SizeButton` was selected for animation because its active state changes when the user selects a coffee size.
- `HorizontalProductCard` was identified as a frequently re-rendered component because it is reused across multiple product list screens.
- Project dependencies and production bundle composition were analyzed using `depcheck` and `source-map-explorer`.

### Task 2. Animation

Animations were implemented using React Native Reanimated.

The `SizeButton` component uses:

- `useSharedValue`
- `useAnimatedStyle`
- `withSpring`

When the selected coffee size changes, the active button smoothly scales to provide visual feedback.

An additional animated "Added to cart" notification was implemented on the Coffee Details screen.

The notification uses:

- `useSharedValue`
- `useAnimatedStyle`
- `withTiming`

After a product is added to the cart, the notification smoothly appears and automatically disappears.

This provides immediate visual feedback without navigating the user away from the product details screen.

### Task 3. Performance Optimization

`HorizontalProductCard` was identified as a component that could re-render frequently because it is reused in several product lists.

The component was wrapped with:

```js
React.memo(HorizontalProductCard)
```

This prevents unnecessary re-renders when the component props have not changed.

Additional optimizations include:

- `useMemo` for product filtering
- `useCallback` for stable favorite callbacks
- `useCallback` for stable product navigation callbacks
- Stable primitive `imageUri` values instead of creating new image objects during every render

The optimizations were applied to:

- Menu
- Popular Products
- Category Products
- Favorites

Console logging was used before and after optimization to verify component rendering behavior.

Before optimization, multiple product cards could render again when the parent component updated.

After optimization, unchanged product cards avoid unnecessary re-renders when their props remain the same.

### Task 4. Dependency Cleanup and Bundle Analysis

Project dependencies were analyzed using `depcheck` and `source-map-explorer`.

The bundle analysis showed that the largest runtime dependencies include:

- `react-native-reanimated`
- `react-native`
- `@react-navigation`
- `react-native-gesture-handler`

These dependencies are actively required by the application and were therefore retained.

The unused `@react-native/new-app-screen` dependency was identified and removed from the project.

`react-native-dotenv` was also reported by `depcheck`. Manual verification of `babel.config.js` showed that it is required to load the API URL from the `.env` file, so this dependency was retained.

No large replaceable utility dependencies such as `moment` or `lodash` were present in the project. Required runtime dependencies were therefore kept instead of introducing unnecessary architectural changes solely to reduce the bundle size.

### Bundle Analysis Results

The Android production bundle was generated and analyzed before and after dependency cleanup using `source-map-explorer`.

| Measurement | Before | After |
| --- | ---: | ---: |
| Bundle size | 2,636,429 bytes | 2,636,733 bytes |
| Approximate size | 2.51 MB | 2.51 MB |

The difference is only 304 bytes, so the runtime bundle size remained effectively unchanged.

The removed dependency was not imported into the production JavaScript bundle. Therefore, removing it cleaned up the project dependencies but did not produce a measurable reduction in the runtime bundle.

The analysis also confirmed that most of the production bundle consists of required React Native, Reanimated, navigation, and gesture handling modules.

## Technologies

- React Native
- JavaScript
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
- source-map-explorer
- depcheck

## Testing

The application was tested on an Android emulator.

The following functionality was tested:

- Context API user state
- Updating user profile information
- Sharing user information between Profile and Home
- Redux store integration
- Adding products to cart
- Removing products from cart
- Updating product quantity
- Updating product size
- Cart calculations
- Adding products to favorites
- Removing products from favorites
- Favorite state synchronization between screens
- Favorites navigation
- REST API product loading
- Loading state
- API error handling
- Product rendering with FlatList
- Navigation between screens
- Bottom Tab navigation
- Drawer navigation
- Drawer swipe gesture
- Stack navigation
- Back navigation
- Product ID and data passing
- Category filtering
- Popular products
- Product search
- Remote API images
- Coffee size selection
- Animated size selection
- Added to cart notification
- Price changes depending on drink size
- Checkout flow
- Product card render optimization
- Product filtering optimization
- Bundle analysis

The project was checked with ESLint and completed without errors or warnings.

`SafeAreaView` is used to support different screen areas and system UI.

## Screenshots

### Welcome Screen

![Welcome Screen](./src/assets/screenshots/welcome.png)

### Home Screen — Context API

The Home screen displays the user name received from `UserContext`.

![Home Screen](./src/assets/screenshots/home.png)

### Menu Screen

![Menu Screen](./src/assets/screenshots/menu.png)

### Coffee Categories

![Coffee Categories](./src/assets/screenshots/categories.png)

### Coffee Categories Search

![Coffee Categories Search](./src/assets/screenshots/categories-search.png)

### Coffee Details

![Coffee Details](./src/assets/screenshots/coffee_details.png)

### Cart — Redux

The Cart screen demonstrates global cart state managed with Redux Toolkit.

![Cart](./src/assets/screenshots/cart.png)

### Checkout

![Checkout](./src/assets/screenshots/checkout.png)

### Drawer

![Drawer](./src/assets/screenshots/drawer.png)

### Favorites — Redux

The Favorites screen demonstrates global favorite product state managed with Redux Toolkit.

![Favorites](./src/assets/screenshots/favorites.png)

### Profile — Context API

The Profile screen allows the user to update global profile information using Context API.

![Profile](./src/assets/screenshots/profile.png)

## Assignment 7 — Optimization Screenshots

### Before Render Optimization

![Before Render Optimization](./src/assets/screenshots/render_before.png)

### After Render Optimization

![After Render Optimization](./src/assets/screenshots/render_after.png)

### Before Reanimated Size Selection

![Size Animation](./src/assets/screenshots/coffee_details_before.png)

### After Reanimated Size Selection

![Size Animation](./src/assets/screenshots/coffee_details_after.png)

### Added to Cart Animation

![Added to Cart](./src/assets/screenshots/added_to_cart.png)

### Bundle Analysis — Before

![Bundle Analysis Before](./src/assets/screenshots/bundle_before.png)

### Bundle Analysis — After

![Bundle Analysis After](./src/assets/screenshots/bundle_after.png)

## Demo Video

A short video demonstrating the application navigation, Context API, Redux cart, favorites, animations, and other main functionality:

[Watch Demo Video](./src/assets/video/app_demo_7.mp4)

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

Create a `.env` file in the project root:

```env
API_URL=YOUR_MOCKAPI_PRODUCTS_URL
```

Start Metro:

```bash
npx react-native start
```

Run the Android application:

```bash
npx react-native run-android
```

## Code Quality

The project follows a modular structure.

- Context API logic is separated into `UserContext.jsx`.
- Redux logic is separated into `cartSlice.js` and `favoritesSlice.js`.
- Redux store configuration is separated into `store.js`.
- Reusable UI components receive dynamic data through props.
- Product list rendering is optimized with `React.memo`, `useMemo`, and `useCallback`.
- Shared values such as colors are stored in constants.
- Complex or non-obvious logic is documented with comments.
- React Native Reanimated is used for interactive UI animations.