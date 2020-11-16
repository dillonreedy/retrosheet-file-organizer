

const { match } = require('assert');
const fs = require('fs');
const path = require('path');
const fileHandler = require('./fileHandler.js');

let resultsDirName = '../retrosheet-data-by-year'

// TODO:
// Put gamelog .txt file in to the root folder

function fillFolder(oldDirName) {
    const eventExtensions = ['.EVN', '.EVA', '.EDN', '.EDA', '.EBA', '.EBN', '.EBF'];

    fs.readdir(oldDirName, (err, files) => {

        files.forEach((fileName) => {
            let matches = fileName.match(/\d{4}/);

            if (matches !== undefined && matches !== null)
            {
                const curYearStr = matches['0'];
                const oldDir = path.resolve(oldDirName, fileName);
                console.log(oldDir);
                const extName = path.extname(fileName);
        
                fileHandler.makeDirectory(path.resolve(resultsDirName)); // Creates result folder
                fileHandler.makeDirectory(path.resolve(resultsDirName, curYearStr)); // Creates year folder
        
                if (extName === '' || extName === '.txt')
                {
                    fileHandler.moveFile(oldDir, path.resolve(resultsDirName, curYearStr, fileName)); // Moves TEAM file or gameolog.txt file into the root
                }
                else if (eventExtensions.indexOf(extName) > -1)
                {
                    fileHandler.makeDirectory(path.resolve(resultsDirName, curYearStr, 'events')); // Creates events folder in year folder
        
                    fileHandler.moveFile(oldDir, path.resolve(resultsDirName, curYearStr, 'events', fileName));
                }
                else if (extName === '.ROS')
                {
                    fileHandler.makeDirectory(path.resolve(resultsDirName, curYearStr, 'rosters')); // Creates rosters folder in year folder
        
                    fileHandler.moveFile(oldDir, path.resolve(resultsDirName, curYearStr, 'rosters', fileName));
                }
            }

        });
    })
}


fillFolder(path.resolve('./retrosheet/event/regular'));
fillFolder(path.resolve('./retrosheet/gamelog'));