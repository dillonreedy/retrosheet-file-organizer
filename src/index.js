

const fs = require('fs');
const path = require('path');
const fileHandler = require('./fileHandler.js');

let oldDirName = './retrosheet/event/regular'
let newDirName = './retrosheet-data-by-year'


fs.readdir(oldDirName, (err, files) => {
    fileHandler.clearFolder();
    if (err) {
        console.log(err);
        return;
    } 

    for (let i = 1871; i < 2020; i++)
    {
        const curYearStr = i.toString();

        files.forEach((fileName) => {
            if (fileName.includes(curYearStr))
            {
                const oldDir = path.join('C:/Dillon_Repos/retrosheet-data-miner', oldDirName, fileName);
                const newDirFile = path.join(__dirname, newDirName, curYearStr, 'events', fileName);

                fileHandler.makeDirectory(path.join(__dirname, newDirName));
                fileHandler.makeDirectory(path.join(__dirname, newDirName, curYearStr));
                fileHandler.makeDirectory(path.join(__dirname, newDirName, curYearStr, 'events'));


                fs.rename(oldDir, newDirFile, (err) => {
                    if (err) console.log(err);
                });
            }
        });
    }
})
