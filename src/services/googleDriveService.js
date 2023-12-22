const path = require('path');
const { google } = require('googleapis');
const { PassThrough } = require('stream');

const KEYFILEPATH = path.join(__dirname, "..", "credentials.json");
const SCOPES = ['https://www.googleapis.com/auth/drive'];

const auth = new google.auth.GoogleAuth({
   keyFile: KEYFILEPATH,
   scopes: SCOPES,
});

const uploadFile = async (files) => {
   
   console.log(files);
   const fileObject = files[0];
   console.log(fileObject);

   const bufferStream = new PassThrough();
   bufferStream.end(fileObject.buffer);
   const { data } = await google.drive({
      version: 'v3',
      auth: auth
   }).files.create({
      media: {
         mimeType: fileObject.mimeType,
         body: bufferStream
      },
      requestBody: {
         name: fileObject.originalname,
         parents: ['164iJb_nA8NHKinpYDrn1HeJcpgaqlwhz']
      },
      fields: 'id, name'
   });
   console.log(`Uploaded file ${data.name} ${data.id}`);
}

module.exports = uploadFile;