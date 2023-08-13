# NODEJS ASSIGNMENT: SERVERS AND API'S

This repository contains the implementation of a web server and an API server using Node.js, aimed at managing inventory information. The assignment focuses on building these components without using any frameworks.

## Web Server

### Rendering HTML Files

The web server is designed to serve HTML files. When you navigate to "/index.html", you will be presented with a simple webpage containing the student's information. This provides a basic introduction to the assignment.

### Custom 404 Page

The web server also includes a feature that handles navigation to non-existent HTML files. When you navigate to a "{random}.html" URL, the server will respond with a 404 page, indicating that the requested page was not found.

## API Server

### Inventory Information Management

The API server is dedicated to managing inventory information for various items. It offers a range of functionalities for CRUD (Create, Read, Update, Delete) operations.

#### API Endpoints

1. **Create Item**: `POST /items`
   - Endpoint to create a new item in the inventory.
   - Attributes: Name, Price, Size, Id.
   
2. **Get All Items**: `GET /items`
   - Endpoint to retrieve information about all items in the inventory.
   
3. **Get One Item**: `GET /items/:id`
   - Endpoint to retrieve information about a specific item based on its Id.
   
4. **Update Item**: `PUT /items/:id`
   - Endpoint to update information about a specific item based on its Id.
   
5. **Delete Item**: `DELETE /items/:id`
   - Endpoint to delete a specific item based on its Id.

#### Item Attributes

Each item in the inventory is characterized by the following attributes:
- Name
- Price
- Size (small, medium, large)
- Id

### Consistency and Modularity

The code is developed with a focus on consistency in the data structure returned by the APIs. Additionally, modularity has been ensured throughout the implementation.

### Data Persistence

The assignment does not involve using a database. Instead, data is persisted using the file system, specifically the "items.json" file.

### Error Handling

Where possible, error handling has been integrated to enhance the robustness of the code.

## Getting Started

To run the assignment, follow these steps:

1. Clone this repository to your local machine.
2. Navigate to the project directory in your terminal.
3. Run `node index.js` to start the web and API servers.
4. Access the web server by opening your browser and navigating to "http://localhost:PORT" where `PORT` is the port number specified in the code.

## Conclusion

This NodeJS assignment demonstrates the creation of a web server to render HTML files and an API server for managing inventory information. The focus on modularity, consistency, and error handling contributes to a well-structured and functional implementation.

## Contributor
[Otavie Okuoyo](https://github.com/Otavie)
