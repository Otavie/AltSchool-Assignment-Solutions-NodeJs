const fs = require('fs')

// 1. Creation of a directory named "Students"
fs.mkdir('./Students', { recursive: true }, (error) => {
    if (error) throw error;
});

// 2. Create a file named user.js in the Students directory
let user = './Students/user.js'
fs.writeFile(user, '', (error) => {
    if (error) throw error;
})

// 3. Rename Students to Names
fs.rename('./Students', './Names', (error) => {
    if (error) throw error;
})

// 4. Name Added to the file user.js
// Added my name and commented it since the file is a js file
fs.writeFile('./Names/user.js', '// Otavie Okuoyo', (error) => {
    if (error) throw error;
})

// 5. Update file to include more details about me
const myDetails = {
    name: "Otavie Okuoyo",
    age: 55,
    sex: "Male",
    nationality: "Nigeria",
    phoneNumber: "070xxx090xxx",
    profession: "Software Engineer"
}

myDetailsString = JSON.stringify(myDetails, null, 2);

fs.writeFile('./Names/user.js', myDetailsString, (error) => {
    if (error) throw error;
})

// 6. Rename user.js to otavie_okuoyo.js
fs.rename('./Names/user.js', './Names/otavie_okuoyo.js', (error) => {
    if (error) throw error;
})

// 7. Read the content of otavie_okuoyo.js
const filePath = './Names/otavie_okuoyo.js';
fs.readFile(filePath, 'utf-8', (error, data) => {
    if (error) throw error;
    console.log(data)
})

// 8. Delete otavie_okuoyo.js
fs.rm('./Names/otavie_okuoyo.js', (error) => {
    if (error) throw error;
})

// 9. Delete Names
fs.rmdir('./Names', (error) => {
    if (error) throw error;
})