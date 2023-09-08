const students = [];

const getStudents = (req, res) => {
    // console.log({ header: req.headers })
    const query = req.query;

    let studentArrayDuplicate = students;

    if (query.program) {
        studentArrayDuplicate = studentArrayDuplicate.filter((student) => {
            student.program.includes(query.program);
        })
    }

    if (query.limit) {
        studentArrayDuplicate = studentArrayDuplicate.slice(0, req.limit - 1);
    }

    if (query.search) {
        studentArrayDuplicate = studentArrayDuplicate.filter((student) => {
            student.program.includes(query.search) || student.name.includes(query.search);
        })
    }

    res.status(200).json({
        data: studentArrayDuplicate,
        error: null
    })
}

const createStudent = (req, res) => {
    const student = req.body;
    student.push(user);

    res.status(201).json({
        data: student,
        error: null
    })
}

const getOneStudent = (req, res) => {
    const urlID = req.params.id;
    const foundStudent = students.find((student) => {
        return student.id == parseInt(urlID);
    })

    if (!foundStudent) {
        res.status(404).json('Student not found!');
    }
    res.status(200).json(foundStudent);
}

const updateStudent = (req, res) => {
    const urlID = req.params.id;
    const updatedStudent = req.body;
    const foundIndex = students.findIndex((student) => {
        return student.id = parseInt(urlID);
    })

    if (foundIndex == -1) {
        res.end(`Student with id ${urlID} is not found`);
        return;
    }
    students[foundIndex] = {...students[foundIndex], ...updatedStudent}
    res.status(200).json(students[foundIndex]);
}

const deleteStudent = (req, res) => {
    const urlID = req.params.id;
    const foundIndex = students.findIndex((student) => {
        student.id == parseInt(urlID);
    })

    if (foundIndex == -1) {
        res.end(`Student with the id ${urlID} not found!`);
        return;
    }

    students.splice(foundIndex, 1);
    res.end(`Student with id ${urlID} deleted successfully`);
}

module.exports = {
    getStudents,
    createStudent,
    getOneStudent,
    updateStudent,
    deleteStudent
}