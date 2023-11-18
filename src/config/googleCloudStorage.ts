import "dotenv/config"
// config.js

module.exports = {
    // Your Google Cloud Storage credentials
    projectId:process.env.GCS_PROJECT_ID,
    keyFilename: 'key.json', // Path to your service account key file
  
    // Configuration for the Google Cloud Storage bucket you want to use
    bucketName: 'stickify-storage',
};
  