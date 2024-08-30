from openai import AsyncOpenAI
import fs from 'fs';
(async function run() {
  const fileid = 'file-kqzPeg6MhD0HoCaDnaK3XSJN';  
  console.log('Loading ', fileid);
  const openai = new OpenAI();

  const file = await openai.files.content(fileid);

  console.log(file.headers);

  const bufferView = new Uint8Array(await file.arrayBuffer());

  fs.writeFileSync('file-kqzPeg6MhD0HoCaDnaK3XSJN.png', bufferView);
  })();
 

