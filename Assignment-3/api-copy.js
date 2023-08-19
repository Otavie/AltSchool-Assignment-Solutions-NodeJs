const http = require('http');
const fs = require('fs');
const PORT = 54321;
const ITEM_FILE = './apple-laptops.json';

const server = http.createServer((req, res) =>{
    if (req.url === '/items' && req.method === 'POST'){
        handlePOSTRequest(req, res);
    } else if (req.url === '/items' && req.method === 'GET'){
        handleGETRequest(res);
    } else if (req.url.startsWith('/items/') && req.method === 'GET'){
        handleGETOneRequest(req, res);
    } else if (req.url.startsWith('/items/') && req.method === 'PUT'){
        handlePUTRequest(req, res);
    } else if (req.url.startsWith('/items/') && req.method === 'PATCH'){
        handlePATCHRequest(req, res);
    } else if (req.url.startsWith('/items/') && req.method === 'DELETE'){
        handleDELETERequest(req, res);
    }
});

function sendJSONResponse(res, statusCode, data){
    res.setHeader('content-type', 'application/json');
    res.writeHead(statusCode);
    res.write(JSON.stringify(data));
    res.end();
}

function handleWriteError(fileName, data){
    fs.writeFile(fileName, data, 'utf-8', (writeError) =>{
        if (writeError){
            console.log(`Error Writing to ${fileName}: ${writeError}`);
        }
    })
}

// 2(a) Function to Create an Item 
function handlePOSTRequest(req, res){
    const data = [];
    // Listening for Incoming Data Chunks
    req.on('data', (chunk) => {
        data.push(chunk);
    })
    // Data Reception Completion
    req.on('end', () =>{
        // Concatenate the Chunks and Parse the Data
        const bufferBody = Buffer.concat(data).toString();
        const bodyOfRequest = JSON.parse(bufferBody);

        // Reading Existing Items From apple-laptops.json File
        fs.readFile(ITEM_FILE, 'utf-8', (error, fileData) =>{
            if (error){
                console.log('Error Reading Laptop(s) from apple-laptops.json: ', error);
                return;
            }

            let items = [];
            if (fileData.trim() != ''){
                items = JSON.parse(fileData);
            }

            // Generate Random ID from 1 to 1000
            const newItem = { ...bodyOfRequest, id: Math.floor(Math.random() * 1000).toString() };
            items.push(newItem);

            // Save Updated Item to apple-laptops.json File
            handleWriteError(ITEM_FILE, JSON.stringify(items, null, 4))
            
            // Send Response with Updated Item List
            sendJSONResponse(res, 201, { data: items })
        });
    })
}

// 2(b) - Function to Get All Items
function handleGETRequest(res){
    fs.readFile(ITEM_FILE, 'utf-8', (error, fileData) =>{
        if (error){
            sendJSONResponse(res, 500, { error: 'Internal Server Error!' });
            return;
        }
        const items = JSON.parse(fileData);
        sendJSONResponse(res, 200, { data: items });
    });
}

// 2(c) Get One Item
function handleGETOneRequest(req, res){
    fs.readFile(ITEM_FILE, 'utf-8', (error, fileData) =>{
        if (error){
            sendJSONResponse(res, 500, { error: 'Internal Server Error!' });
            return;
        }

        const id = req.url.split('/')[2];
        const items = JSON.parse(fileData);
        const itemID = items.findIndex((item) => item.id === id);

        if (itemID === -1){
            sendJSONResponse(res, 404, { data: null, error: 'Laptop Not Found!' });
            return;
        }

        sendJSONResponse(res, 200, { data: items[itemID], error: null });
    })
}

// 2(d) Complete Update of an Item using PUT
function handlePUTRequest(req, res){
    const data = [];
    req.on('data', (chunk) =>{
        data.push(chunk);
    });

    req.on('end', () =>{
        const bufferBody = Buffer.concat(data).toString();
        const updatedItem = JSON.parse(bufferBody);

        fs.readFile(ITEM_FILE, 'utf-8', (error, fileData) =>{
            if (error){
                sendJSONResponse(res, 500, { error: 'Internal Server Error!' })
                return;
            }

            const id = req.url.split('/')[2];
            const items = JSON.parse(fileData);
            const itemID = items.findIndex((item) => item.id === id);

            if (itemID === -1){
                sendJSONResponse(res, 404, { data: null, error: 'Laptop Not Found!' });
                return;
            }

            items[itemID] = { ...updatedItem, id: id };

            // Save the Update Item to the JSON File (apple-laptops.json)
            handleWriteError(ITEM_FILE, JSON.stringify(items, null, 4))
            sendJSONResponse(res, 200, { data: items[itemID], error: null });
        })
    });
}

// 2(d) - Partial Update of an Item Using PATCH
function handlePATCHRequest(req, res){
    const data = [];
    req.on('data', (chunk) =>{
        data.push(chunk);
    });

    // Data Reception Completed
    req.on('end', () =>{
        const bufferBody = Buffer.concat(data).toString();
        const updatedProps = JSON.parse(bufferBody);

        fs.readFile(ITEM_FILE, 'utf-8', (error, fileData) =>{
            if (error){
                sendJSONResponse(res, 500, { error: 'Internal Server Error!' });
                return;
            }

            const id = req.url.split('/')[2];
            const items = JSON.parse(fileData);
            const itemID = items.findIndex((item) => item.id === id);

            if (itemID === -1){
                sendJSONResponse(res, 404, { data: null, error: 'Laptop Not Found!' });
                return;
            }

            items[itemID] = { ...items[itemID], ...updatedProps };

            // Save the Updated Item to the JSON File (apple-laptops.json)
            handleWriteError(ITEM_FILE, JSON.stringify(items, null, 4));
            sendJSONResponse(res, 200, { ...items[itemID], error: null });
        })  
    })
}

// 2(e) Function to DELETE an Item using DELETE
function handleDELETERequest(req, res){
    fs.readFile(ITEM_FILE, 'utf-8', (error, fileData) =>{
        if (error){
            sendJSONResponse(res, 500, { error: 'Internal Server Error!' });
            return;
        }

        const id = req.url.split('/')[2];
        const items = JSON.parse(fileData);
        const itemID = items.findIndex((item) => item.id === id);

        if (itemID === -1){
            sendJSONResponse(res, 404, { data: null, error: 'Laptop Not Found!' });
            return;
        }

        const deletedItem = items.splice(itemID, 1);

        handleWriteError(ITEM_FILE, JSON.stringify(items, null, 4));

        sendJSONResponse(res, 200, { data: deletedItem, error: null });
    })
}

server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`)
});