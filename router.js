const stream = require('stream');
const express = require('express');
const multer = require('multer');
const path = require('path');
const { google } = require('googleapis');
const { PassThrough } = require('stream');

const uploadRouter = express.Router();
const upload = multer();

const KEYFILEPATH = path.join(__dirname, "credentials.json");
const SCOPES = ['https://www.googleapis.com/auth/drive'];

const auth = new google.auth.GoogleAuth({
   keyFile: KEYFILEPATH,
   scopes: SCOPES,
});

const uploadFile = async (fileObject) => {
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
   })
   console.log(`Uploaded file ${data.name} ${data.id}`);
}

uploadRouter.post('/upload', upload.any('Files'), async (req, res) => {
   try {
      const { body, files } = req;

      await uploadFile(files)

      console.log(body);
      res.status(200).send("Form submitted")
   } catch (error) {
      console.log(error);
      res.status(500).send("Something went wrong")
   };
});

module.exports = uploadRouter;