const MAX_LEN = 5;
export const generate = () => {
  const subset = "1234567890abcdefghijklmnopqrstuvwxyz";
  let i = 0;
  let id = "";
  while (i < MAX_LEN) {
    id += subset[Math.floor(Math.random() * subset.length)];
    i++;
  }
  console.log(`id generate is ${id}`);
  return id;
};

import fs from  "fs";
import path from "path";

export const getAllFiles = (folderPath: string) =>{
  let response: string[] = [];
  const allFilesAndFolders = fs.readdirSync(folderPath);
  allFilesAndFolders.forEach((file) => {
    const fullFilePath = path.join(folderPath, file);
    if(fs.statSync(fullFilePath).isDirectory()){
      response = response.concat(getAllFiles(fullFilePath));
    }else{
      response.push(fullFilePath);
    }
  });
  return response;
};