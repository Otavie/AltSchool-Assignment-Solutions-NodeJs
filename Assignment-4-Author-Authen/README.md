# INVENTORY MANAGEMENT API

**Description:**
The Inventory Management API is a Node.js-based backend system designed to manage items and user accounts. It provides a set of RESTful API endpoints for creating, retrieving, updating, and deleting items. Additionally, users can register with the system, and their accounts are equipped with an automatically generated API key for authentication.

**Key Features:**

- **Items Management:** Administrators can create, retrieve, update, and delete items.
- **User Registration:** Users can register with the system, with roles automatically assigned based on their email addresses.
- **User Authentication:** Users are authenticated using API keys.

**Roles:**

- **Admin:** Users with admin privileges can manage items and have full access to the system.
- **Employee:** Standard users who can retrieve items but cannot manage them.

The project structure is organized into different modules, including users, items, and middleware, to separate concerns and maintain clean code. It follows RESTful API principles and uses JSON files for data storage.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API](#api)
  - [Items](#items)
    - [Retrieve All Items](#retrieve-all-items)
    - [Retrieve One Item](#retrieve-one-item)
    - [Create an Item](#create-an-item)
    - [Update an Item Using PUT](#update-an-item-using-put)
    - [Update an Item Using PATCH](#update-an-item-using-patch)
    - [Delete an Item](#delete-an-item)
  - [Users](#users)
    - [User Registration](#user-registration)
    - [User Authentication](#user-authentication)
- [Contributing](#contributing)
- [License](#license)

## Installation

To get started with this project, follow the installation instructions below:

1. Clone the repository to your local machine:

   ```shell
   git clone https://github.com/Otavie/AltSchool-Assignment-Solutions-NodeJs.git
   ```

2. Navigate to the project directory:

   ```shell
   cd Assignment-4-Author-Authen
   ```

3. Install the required dependencies:

   ```shell
   npm install
   ```

## Usage

Once the project is set up, you can start using it as follows:

1. Start the server:

   ```shell
   npm start
   ```

2. Access the API at [http://localhost:54321](http://localhost:54321).

## API

### Items

#### Retrieve All Items

**Endpoint**: `/items`

**Method**: `GET`

**Description**: Retrieve a list of all items.

**Response**:

- `200 OK`: Items retrieved successfully.
- `404 Not Found`: No items found.

#### Retrieve One Item

**Endpoint**: `/items/:id`

**Method**: `GET`

**Description**: Retrieve a single item by its ID.

**Response**:

- `200 OK`: Item retrieved successfully.
- `404 Not Found`: Item not found.

#### Create an Item

**Endpoint**: `/items`

**Method**: `POST`

**Description**: Create a new item (Admin privilege only).

**Request Body**:

```json
{
  "name": "Example Item",
  "price": "₦ 1,000.00",
  "size": "Large"
}
```

**Response**:

- `201 Created`: Item created successfully.
- `400 Bad Request`: Item cannot be added.

#### Update an Item Using PUT

**Endpoint**: `/items/:id`

**Method**: `PUT`

**Description**: Update an item by replacing it with the provided data (Admin privilege only).

**Request Body**:

```json
{
  "name": "Updated Item",
  "price": "₦ 1,500.00",
  "size": "Medium"
}
```

**Response**:

- `200 OK`: Item updated successfully.
- `404 Not Found`: Item not found.

#### Update an Item Using PATCH

**Endpoint**: `/items/:id`

**Method**: `PATCH`

**Description**: Update an item by applying partial changes (Admin privilege only).

**Request Body**:

```json
{
  "price": "₦ 1,800.00"
}
```

**Response**:

- `200 OK`: Item updated successfully.
- `404 Not Found`: Item not found.

#### Delete an Item

**Endpoint**: `/items/:id`

**Method**: `DELETE`

**Description**: Delete an item (Admin privilege only).

**Response**:

- `204 No Content`: Item deleted successfully.
- `404 Not Found`: Item not found.

### Users

#### User Registration

**Endpoint**: `/users/register`

**Method**: `POST`

**Description**: Register a new user. Automatically assigns the "admin" role to users with email addresses "otavie@gmail.com" or "life@gmail.com".

**Request Body**:

```json
{
  "username": "JohnDoe",
  "password": "Secret123",
  "email": "johndoe@example.com"
}
```

**Response**:

- `201 Created`: User registered successfully.
- `400 Bad Request`: User registration failed.

#### User Authentication

**Endpoint**: `/users/authenticate`

**Method**: `POST`

**Description**: Authenticate a user using their API key.

**Request Headers**:

```json
{
  "api_key": "user-api-key"
}
```

**Response**:

- `200 OK`: User authenticated successfully.
- `401 Unauthorized`: Authentication failed.

## Contributing

Contributions are welcome! Feel free to open issues or pull requests.

## License

This project is licensed under the [License Name] License - see the [LICENSE](LICENSE) file for details.
