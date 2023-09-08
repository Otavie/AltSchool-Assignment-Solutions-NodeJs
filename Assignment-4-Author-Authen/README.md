# EXPRESS FRAMEWORK - WEB SERVER AND API SERVER

This directory contains code that demonstrates the use of the Express framework to build a web server for rendering HTML files and an API server for managing inventory information.

## Task 1: Web Server to Render HTML Files

### Endpoint: `/index.html`

Navigating to `/index.html` will display a simple webpage of the student.

### Endpoint: `/{random}.html`

Navigating to `/{random}.html` will return a 404 page, indicating that the requested page was not found.

## Task 2: API Server for Inventory Management

### API Endpoints

1. `POST /api/items`: Create a new item.
2. `GET /api/items`: Get a list of all items.
3. `GET /api/items/:id`: Get information about a specific item by ID.
4. `PUT /api/items/:id`: Update information about a specific item by ID.
5. `DELETE /api/items/:id`: Delete a specific item by ID.

### Item Attributes

An item has the following attributes:

- Name
- Price
- Size: small(s), medium(m), or large(l)
- Id

## Additional Notes

- The data structure returned by the APIs will be consistent across all endpoints.
- The code is designed with modularity in mind to enhance readability and maintainability.
- Error handling has been implemented where possible to provide meaningful error messages.
- Filtering by program is supported using query parameters (e.g., `/api/items?program=nodejs`).
- The data is persisted using the file system. An `items.json` file is used to store item information.

## Getting Started

1. Clone this repository to your local machine.
2. Install the required dependencies using `npm install`.
3. Run the application using `npm start`.

## Dependencies

- Express: A fast and minimal web framework for Node.js.
- body-parser: Middleware for parsing request bodies.
- uuid: Library for generating unique IDs.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contributor
[Otavie Okuoyo](https://github.com/Otavie)