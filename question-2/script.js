/**
 * On this module you should write your answer to question #2.
 * This file would be executed with the following command:
 * $ node scritp.js BrowsingEvents.csv
 */

const fs = require('fs'); 
const csv = require('csv-parser');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const ProductData = require('./classes/ProductData.js');


const args = process.argv.slice(-1);
console.log(`Running question #2 with args ${args}`)
readCSV(args);

function readCSV(args){
    var csvData=[];

    fs.createReadStream(args[0])
    .pipe(csv())
    .on('data', (row) => {
        csvData.push(row)
    })
    .on('end', () => {
        filter(csvData);
    }); 

}

function filter(navigationData){
    let uniqueProductsId = new Set();
    var processedData = [];

    navigationData.forEach(element => {
        //Verificamos que del producto se cree solo una instancia
        if(!uniqueProductsId.has(element.entityId)){
            
            let productData = new ProductData(element.entityId);
            
            uniqueProductsId.add(element.entityId)

            if(element.eventType == "click" ){
                productData.addClick(element.user);
            }else{
                productData.addImpresions(element.user);
            }
            processedData.push(productData);
        }else{
            var index = processedData.findIndex(product => product.productId == element.entityId);

            if(element.eventType == "click"){
                processedData[index].addClick(element.user)
            }else{
                processedData[index].addImpresions(element.user)
            } 
        }
    });

    writeCSV(processedData);
    
}

function writeCSV(processedData){
    data = [];
    const csvWriter = createCsvWriter({
    path: 'output.csv',
    header: [
        {id: 'productId', title: 'productId'},
        {id: 'clicks', title: 'clicks'},
        {id: 'impressions', title: 'impressions'},
        {id: 'ctr', title: 'ctr'},
    ]
    });

    processedData.forEach(element =>{
        data.push({
            productId: element.productId,
            clicks: element.clicks,
            impressions: element.impressions,
            ctr: element.ctr
        })
    })

    csvWriter
        .writeRecords(data)
        .then(()=> console.log('The CSV file was written successfully'));

}



