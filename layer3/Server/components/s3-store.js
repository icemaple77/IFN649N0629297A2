require("dotenv").config();
process.env.AWS_SDK_LOAD_CONFIG = true;
const AWS = require("aws-sdk"); // S3 setup

AWS.config.update({ region: AWS.config.region });
const bucketName = "n10629297-ifn649-store";

s3 = new AWS.S3({ apiVersion: "2006-03-01" });

// Call S3 to list the buckets
const ListS3 = s3.listBuckets(function (err, data) {
  if (err) {
    console.log("Error", err);
  } else {
    console.log("Success", data.Buckets);
    return data.Buckets;
  }
});

const createS3 = () => {
  s3.createBucket({ Bucket: bucketName })
    .promise()
    .then(() => console.log(`Created bucket: ${bucketName}`))
    .catch((err) => {
      // We will ignore 409 errors which indicate that the bucket already exists
      if (err.statusCode !== 409) {
        console.log(`Error creating bucket: ${err}`);
      }
    });
}; //Basic key/key - fixed here, modify for the route code
//Create object upload promise
const updateS3 = async (objectParams) => {
  s3.putObject(objectParams)
    .promise()
    .then(() => {
      console.log(
        `Successfully uploaded data to ${bucketName}/${objectParams.Key}`
      );
    })
    .catch((err) => {
      console.log(err, err.stack);
    });
};
function GetS3(params) {
  const data = s3
    .getObject(params)
    .promise()
    .then((result) => {
      const data = JSON.parse(result.Body);

      return { data };
    })
    .catch((err) => {
      if (err.statusCode === 404) {
      } else {
        // Something else went wrong when accessing S3
        console.log(err);
        return null;
      }
    });
  return data;
}
module.exports = { ListS3, createS3, updateS3, GetS3 };
