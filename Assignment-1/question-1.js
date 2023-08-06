const os = require('os');
const path = require('path');

// 1. Print current working directory
const currentWorkingDir = process.cwd()
console.log('The current working directory is:', currentWorkingDir);

// // 2. Print the separator of a given file
const filePath = '/AltSchool/Second-Semester/Assignment/Assignment-1/question-1.js';
const normalizedPath = path.normalize(filePath);
const sepIndex = normalizedPath.indexOf(path.sep);
const separator = normalizedPath.substring(sepIndex, sepIndex +path.sep.length);
console.log('File path separator is', separator)
// console.log('File path separator is', sepIndex)

// 3. Print the extension of name of a file path
const fileExtension = path.extname(filePath);
console.log('File extension is: ', fileExtension)

// 4. Print the process id of current running process
const processID = process.pid;
console.log('Process ID of current running process is: ', processID);

// 5. Print out the user information of the os
const userOSInfo = os.userInfo();
console.log('The following are the user information:');
console.log('Username: ', userOSInfo.username)
console.log('Home Directory: ', userOSInfo.homedir)
console.log('User ID: ', userOSInfo.uid)
console.log('Group ID: ', userOSInfo.gid)

// 6. Print out the platform of an Operating System
const platform = os.platform();
console.log('Operating system platform: ', platform)