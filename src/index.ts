import express from "express"
import cors from "cors";
import simpleGit from 'simple-git';
import { generate, getAllFiles } from "./utils";
import path from "path";
import { uploadFile } from "./aws";
import { createClient } from 'redis';
const publisher = createClient();
publisher.connect();

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

app.post("/deploy", async (req, res) => {
  const repoUrl = req.body.repoUrl;
  const id = generate();
  await simpleGit().clone(repoUrl, path.join(__dirname, `output/${id}`));
  const files = getAllFiles(path.join(__dirname, `output/${id}`));
  files.forEach(async (file) => {
    await uploadFile(file.slice(__dirname.length+1), file);
  });
  publisher.lPush("build-queue", id);
  console.log(repoUrl);
  res.json({
    id
  });
})

app.listen(port);