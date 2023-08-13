const http = require('http');
const fs = require('fs');
const PORT = 54321;
const ITEM_FILE = './apple-laptops.json';

const server = http.createServer((req, res) => {
    // 2(a) Create Item
    if (req.url === '/items' && req.method === 'POST'){
        const data = [];
    
        // Listening for Incoming Data Chunks
        req.on('data', (chunk) => {
            data.push(chunk)
        })

        // Data Reception Completed
        req.on('end', () => {
            // Concatenate the Chunks and Parse the Data 
            const bufferBody = Buffer.concat(data).toString();
            const bodyOfRequest = JSON.parse(bufferBody);

            // Reading Existing Items from items.json File
            fs.readFile(ITEM_FILE, 'utf-8', (error, fileData) => {
                if (error){
                    console.log('Error Reading Laptop(s) from apple-laptops.json: ', error);
                    return;
                }

                let items = [];
                if (fileData.trim() != ''){
                    items = JSON.parse(fileData)
                }

                // Generate Random ID
                const newItem = {...bodyOfRequest, id: Math.floor(Math.random() * 500).toString()};
                items.push(newItem);

                // Save Updated Items to items.json File
                fs.writeFile(ITEM_FILE, JSON.stringify(items, null, 4), 'utf-8', (writeError) =>{
                    if (writeError) {
                        console.log('Error Writing to apple-laptops.json: ', writeError);
                    }
                });

                // Send Response with Updated Item List
                res.setHeader('content-type', 'application/json');
                res.writeHead(201);
                res.write(JSON.stringify({ data: items }));
                res.end();
                });

        });

    }

    // 2(b) Get all the Items
    if (req.url === '/items' && req.method === 'GET'){
        fs.readFile(ITEM_FILE, 'utf-8', (error, fileData) => {
            if (error){
                res.setHeader('content-type', 'application/json');
                res.writeHead(500);
                res.write(JSON.stringify({ error: 'Internal server error!' }));
                res.end();
                return;
            }

            const items = JSON.parse(fileData);

            res.setHeader('content-type', 'application/json');
            res.writeHead(200);
            res.write(JSON.stringify({ data: items }));
            res.end();    
        });
    }

    // 2(c) Get One Item
    if (req.url.startsWith('/items/') && req.method === 'GET'){
        fs.readFile(ITEM_FILE, 'utf-8', (error, fileData) =>{
            if (error){
                res.setHeader('content-type', 'application/json');
                res.writeHead(500);
                res.write(JSON.stringify({ error: "Internal server error" }));
                res.end();
                return;
            }

            const id = req.url.split('/')[2];
            const items = JSON.parse(fileData);
            const itemID = items.findIndex((item) => item.id === id);
    
            if (itemID === -1){
                res.setHeader('content-type', 'application/json');
                res.writeHead(404);
                res.write(JSON.stringify({data: null, error: 'Laptop not found!'}));
                res.end();
                return;
            }
    
            const item = items[itemID];
    
            res.setHeader('content-type', 'application/json');
            res.writeHead(200);
            res.write(JSON.stringify({ data: item, error: null }));
            res.end();
        });
    }

    // 2(d) Complete Update of an Item
    if (req.url.startsWith('/items/') && req.method === 'PUT'){
        const data = [];

        req.on('data', (chunk) =>{
            data.push(chunk);
        });

        // Data Reception Completed
        req.on('end', () =>{
            const bufferBody = Buffer.concat(data).toString();
            const updatedItem = JSON.parse(bufferBody);

            fs.readFile(ITEM_FILE, 'utf-8', (error, fileData) =>{
                if (error){
                    res.setHeader('content-type', 'application/json');
                    res.writeHead(500);
                    res.write(JSON.stringify({ error: "Internal server error" }));
                    res.end();
                    return;
                }
    
                const id = req.url.split('/')[2];
                const items = JSON.parse(fileData);
                const itemID = items.findIndex((item) => item.id === id);
        
                if (itemID === -1){
                    res.setHeader('content-type', 'application/json');
                    res.writeHead(404);
                    res.write(JSON.stringify({data: null, error: 'Laptop not found!'}));
                    res.end();
                    return;
                }
        
                // Update the Item with the New Data
                items[itemID] = { ...updatedItem, id: id };
                
                // Save the Updated Item to the File
                fs.writeFile(ITEM_FILE, JSON.stringify(items, null, 4), 'utf-8', (writeError) =>{
                    if (writeError){
                        console.log('Error Writing to apple-laptops.json', writeError);
                    }
                });

                res.setHeader('content-type', 'application/json');
                res.writeHead(200);
                res.write(JSON.stringify({ data: items[itemID], error: null }));
                res.end();
            });
        })
    }


    // 2(d) Partial Update of an Item
    if (req.url.startsWith('/items/') && req.method === 'PATCH'){
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
                    res.setHeader('content-type', 'application/json');
                    res.writeHead(500);
                    res.write(JSON.stringify({ error: "Internal server error" }));
                    res.end();
                    return;
                }
    
                const id = req.url.split('/')[2];
                const items = JSON.parse(fileData);
                const itemID = items.findIndex((item) => item.id === id);
        
                if (itemID === -1){
                    res.setHeader('content-type', 'application/json');
                    res.writeHead(404);
                    res.write(JSON.stringify({data: null, error: 'Laptop not found!'}));
                    res.end();
                    return;
                }
        
                // Partially Update the Item's Properties
                items[itemID] = { ...items[itemID], ...updatedProps };
                
                // Save the Updated Item to the File
                fs.writeFile(ITEM_FILE, JSON.stringify(items, null, 4), 'utf-8', (writeError) =>{
                    if (writeError){
                        console.log('Error Writing to apple-laptops.json', writeError);
                    }
                });

                res.setHeader('content-type', 'application/json');
                res.writeHead(200);
                res.write(JSON.stringify({ data: items[itemID], error: null }));
                res.end();
            });
        })
    }


    // 2(e) Delete an Item
    if (req.url.startsWith('/items/') && req.method === 'DELETE'){
        fs.readFile(ITEM_FILE, 'utf-8', (error, fileData) =>{
            if (error){
                res.setHeader('content-type', 'application/json');
                res.writeHead(500);
                res.write(JSON.stringify({ error: "Internal server error" }));
                res.end();
                return;
            }

            const id = req.url.split('/')[2];
            const items = JSON.parse(fileData);
            const itemID = items.findIndex((item) => item.id === id);

            if (itemID === -1){
                res.setHeader('content-type', 'application/json');
                res.writeHead(404);
                res.write(JSON.stringify({data: null, error: 'Laptop not found!'}));
                res.end();
                return;
            }

            // Remove the Item from the Array
            const deletedItem = items.splice(itemID, 1);
            
            // Save the Updated Item to the File
            fs.writeFile(ITEM_FILE, JSON.stringify(items, null, 4), 'utf-8', (writeError) =>{
                if (writeError){
                    console.log('Error Writing to apple-laptops.json', writeError);
                }
            });

            res.setHeader('content-type', 'application/json');
            res.writeHead(200);
            res.write(JSON.stringify({ data: deletedItem, error: null }));
            res.end();
        });      
    } 

})


server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`)
});