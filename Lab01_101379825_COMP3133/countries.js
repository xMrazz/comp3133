// Igor Tsyupko
// ID: 101379825

const fs = require('fs');
const csv = require('csv-parser');

// Filter data by country and write to file
function dataFilter(inputFile, outputFileName, filterCountry) {
    const writeStream = fs.createWriteStream(outputFileName);

    fs.createReadStream(inputFile)
        .pipe(csv())
        .on('data', (row) => {
            if (row && row.country && row.country.toLowerCase() === filterCountry.toLowerCase()) {
                writeStream.write(`${Object.values(row).join(',')}\n`);
            }
        })
        .on('end', () => {
            writeStream.end();
        })
        .on('finish', () => {
            console.log(`Data for ${filterCountry} has been filtered`);
        })
        .on('error', (error) => {
            console.error(`Error: ${error.message}`);
        });
}

// Delete file if already exists
function deleteFile(filename) {
    try {
        if (fs.existsSync(filename)) {
            fs.unlinkSync(filename);
            console.log(`${filename} has been deleted`);
        }
    } catch (error) {
        console.error(`Error: ${error.message}`);
    }
}


['canada.txt', 'usa.txt'].forEach(deleteFile);

dataFilter('input_countries.csv', 'canada.txt', 'Canada');
dataFilter('input_countries.csv', 'usa.txt', 'United States');