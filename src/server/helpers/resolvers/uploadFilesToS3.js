import uploadFileToS3 from "./uploadFileToS3.js"

const uploadFilesToS3 = files => files.map(uploadFileToS3)

export default uploadFilesToS3
