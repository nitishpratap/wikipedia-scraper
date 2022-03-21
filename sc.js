const cheerio = require('cheerio')
const request = require('request')
const fs = require('fs')
const url = "https://en.wikipedia.org/wiki/Demographics_of_Uttar_Pradesh#:~:text=As%20of%20the%202011%20census,very%20low%20ratio%20of%20851."
request(url,cb);
function cb(error,response, html){
    if(error){
        console.log(error);
    }
    else{
        handleHtml(html);
    }
}
function handleHtml(html){
    let selector = cheerio.load(html);
    let district =  selector('#mw-content-text > div.mw-parser-output > table:nth-child(7) > tbody')
    let x = district.text()
    // console.log(x)
   let y = x.split("\n\n\n");
   
   console.log("")
   for(let i=5;i<y.length-2;i++){
   let z = y[i].split("\n");
   console.log("District\t\tMale\t\tFemale\t\tTotal\t\tLitracy");
   console.log(z[0]+"\t\t"+z[1]+" \t"+z[2]+" \t"+z[3]+" \t"+z[7]);
   console.log();

   fs.appendFileSync("./district.txt",'District\t\t\tMale\t\t\tFemale\t\t\tTotal\t\t\tLitracy\n\n');
    fs.appendFileSync("./district.txt",z[0].toString());
    fs.appendFileSync("./district.txt","\t\t\t");

    fs.appendFileSync("./district.txt",z[1].toString());
    fs.appendFileSync("./district.txt","\t\t\t");
    fs.appendFileSync("./district.txt",z[2].toString());
    fs.appendFileSync("./district.txt","\t\t\t");
    fs.appendFileSync("./district.txt",z[3].toString());
    fs.appendFileSync("./district.txt","\t\t\t");
    fs.appendFileSync("./district.txt",z[7].toString());
    fs.appendFileSync("./district.txt","\n\n");
   }
}