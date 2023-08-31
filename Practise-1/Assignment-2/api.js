const http = require('http');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const PORT = 3131;
const studentsFile = './students.json';

const server = http.createServer((req, res) =>{
    if (req.url === '/students' && req.method === "GET") {
        GetAllStudents(req, res);
    }

    if (req.url === '/students' && req.method === "POST") {
        AddStudent(req, res);
    }

    if (req.url.startsWith('/students/') && req.method === "GET") {
        GetOneStudent(req, res);
    }

    if (req.url.startsWith('/students/') && req.method === "PUT") {
        PartUpdate(req, res);
    }
})

// GET All Students
function GetAllStudents(req, res) {
    fs.readFile(studentsFile, 'utf-8', (error, fileData) => {
        if (error) {
            console.log(error);
            return;
        }
        const students = JSON.parse(fileData);
        res.setHeader('content-type', 'application/JSON');
        res.writeHead(200);
        res.write(JSON.stringify(students));
        res.end();
    })
}

// Add a Student
function AddStudent(req, res) {
    fs.readFile(studentsFile, 'utf-8', (error) => {
        if (error) {
            console.log(error);
            return;
        }

        const data = [];
        
        req.on('data', (chunk) => {
            data.push(chunk);
        })

        req.on('end', () => {
            const bufferBody = Buffer.concat(data).toString();
            const bodyOfRequest = JSON.parse(bufferBody)
            const id = uuidv4();

            fs.readFile(studentsFile, 'utf-8', (error, fileData) => {
                if (error) {
                    console.log(error);
                    return;
                }

                let students = [];
                if (fileData.trim() != '') {
                    students = JSON.parse(fileData);
                }

                students.push({ id:id, ...bodyOfRequest })

                fs.writeFile(studentsFile, JSON.stringify(students, null, 4), 'utf-8', (error) => {
                    if (error) {
                        console.log(error);
                        return;
                    }

                    res.setHeader('content-type', 'application/JSON');
                    res.writeHead(200).write(JSON.stringify(students));
                    res.end();        
                })
                
            })
        })
    })
}

// Get One Student
function GetOneStudent(req, res) {
    const urlID = req.url.split('/')[2]
    
    fs.readFile(studentsFile, 'utf-8', (error, fileData) => {
        if (error) {
            console.log(error);
            return;
        }

        const students = JSON.parse(fileData);
        const student = students.find((student) => student.id === urlID)
        console.log(student);

        if (student) {
            res.setHeader('content-type', 'application/json');
            res.writeHead(200).write(JSON.stringify(student));
        } else {
            res.writeHead(404).write('Student Not Found!');
        }
        res.end();
    })
}

// Complete or Partial Update
function PartUpdate(req, res) {
    const urlID = req.url.split('/')[2];

    fs.readFile(studentsFile, 'utf-8', (error, fileData) => {
        if (error) {
            console.log(error);
            return;
        }

        const students = JSON.parse(fileData);
        const studentInd = students.findIndex(student => student.id === urlID);
        if (studentInd !== -1) {
            const data = [];
            
            req.on('data', (chunk) => {
                data.push(chunk);
            })
            
            req.on('end', () => {
                const bufferBody = Buffer.concat(data).toString();
                const bodyOfRequest = JSON.parse(bufferBody)

                students[studentInd].name = bodyOfRequest.name || students[studentInd].name;
                // students[studentInd].name = bodyOfRequest.name ? bodyOfRequest.name : students[studentInd].name;
                students[studentInd].department = bodyOfRequest.department || students[studentInd].department;
                // students[studentInd].department = bodyOfRequest.department ? bodyOfRequest.department: students[studentInd].department;
                students[studentInd].school = bodyOfRequest.school ||  students[studentInd].school;
                // students[studentInd].school = bodyOfRequest.school ? bodyOfRequest.school : students[studentInd].school;

                fs.writeFile(studentsFile, JSON.stringify(students, null, 4), 'utf-8', (error) => {
                    if (error) {
                        console.log(error);
                        return;
                    }

                    res.writeHead(200).write(JSON.stringify(students[studentInd]));        
                })
            });

        } else {
            res.writeHead(404).write(`No Student with ${urlID} Exist!`);
        }

        res.end();
    })
}


server.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
})