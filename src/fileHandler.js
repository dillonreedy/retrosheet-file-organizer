const fs = require('fs');
const path = require('path');

let dir = "results";
let folderPath = path.join(__dirname, dir);

const clearFolder = (specifiedPath) => {
    // delete directory recursively

    try {
        if (specifiedPath === undefined) throw new Error('Specify clear folder path.')
        fs.rmdirSync(specifiedPath, { recursive: true });

        console.log(`${specifiedPath} is deleted!`);
    } catch (err) {
        console.error(`Error while deleting ${specifiedPath}.`);
    }
}

const moveFile = (oldFilePath, newFilePath) => {
    fs.rename(oldFilePath, newFilePath, (err) => {
        if (err) console.log(err);
    });
}

const makeDirectory = (specifiedPath) => {
    if (!fs.existsSync(specifiedPath)){
        fs.mkdirSync(specifiedPath);
    }
}

const writeToFile = (data, fileName = `${Date.now().toString()}result`, fileExtension = 'html') => {
    let fullFileName = `${fileName}.${fileExtension}`
    let filePath = path.join(__dirname, dir, fullFileName);
     
    if (!fs.existsSync(folderPath)) fs.mkdirSync(folderPath);


    if (fs.existsSync(filePath))
    {
        fs.appendFile(filePath, data, (err) => {
            if (err) throw err;
        });
    }
    else
    {
        fs.open(filePath, 'w',(err) => {
            if (err) throw err;
            console.log(`${fullFileName} created at ${folderPath}`);
        });
    
        fs.writeFile(filePath, data, (err) => {
            if (err) throw err;
            console.log(`Data successfully written to ${fullFileName}`);
        })
    }
}

module.exports = {
    clearFolder,
    makeDirectory,
    moveFile,
    writeToFile
}