const uploadFile = require("../services/googleDriveService");


const handleFileUpload = async (req, res) => {
   try {
      const { body, files } = req;

      await uploadFile(files);

      console.log(body);
      res.status(200).send("Form submitted")
   } catch (error) {
      console.log(error);
      res.status(500).send("Something went wrong")
   };
}

module.exports = handleFileUpload;