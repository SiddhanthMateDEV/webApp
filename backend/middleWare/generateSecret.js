import crypto from "crypto";
import fs from "fs";
import path from "path";

function generateJWTSecret(length = 256, format = 'base64'){
    return crypto.randomBytes(length).toString(format);
}

function writeToENVFile(secretKey, filePath = "/Users/siddhanthmate/Desktop/AllFiles/CODE/webApp/.env"){
    const envFilePath = path.resolve(filePath);
    let envContent = '';

    if(fs.existsSync(envFilePath)){
        try{
            envContent = fs.readFileSync(envFilePath,'utf-8');
        } catch (error) {
            throw new Error(`Error reading the file in writeToENVFile function: ${error}\n`);
        } 
    } else {
        throw new Error(`writeToENVFile function cannot find the file: ${envContent}\n`);
    }

    const envLines = envContent.split('\n');
    let keyUpdated = false;

    for (let i = 0; i < envLines.length; i++){
        if(envLines[i].startsWith('JWT_SECRET=')){
            envLines[i] = `JWT_SECRET = ${secretKey}`;
            keyUpdated = true;
            break;
        }
    }

    if(!keyUpdated){
        envLines.push(`JWT_SECRET = ${secretKey}`);
    }
    envContent = envLines && envLines.join('\n');
    
    try {
        fs.writeFileSync(envFilePath,envContent);
    } catch (error) {
        console.error(`Error while writing the .env file: ${error}`);
    }
}

const secretKey = generateJWTSecret();
writeToENVFile(secretKey);