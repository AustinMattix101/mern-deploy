    // UploadImg
const multer = require('multer');
const { diskStorage } = require('multer');

module.exports = function UploadImg() {

const imgArrivals = "assets/images";
const storage = diskStorage({
            destination: (req, file, cb) => {
                cb(null, imgArrivals);
            }, 
            filename: (req, file, cb) => {
                cb(null, file.originalname);
            }
        });

const imageFileFilter =  (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif|ico|svg|eps)$/)) {
        return cb(new Error('You can upload only image file!'), false)
    } else {
        cb(null, true);
    }
}    

const upload = multer({ storage: storage, fileFilter: imageFileFilter });

    return upload;
  
}

    // Controller 
module.exports.postUploadImg = function postUploadImg(req, res) {
        res.status(201).setHeader("Content-Type", "application/json").json(`File: ${req.file}`);
}

module.exports.getUploadImg = function getUploadImg(_req, res, next) {
        res.status(403).end("Oh my Bad!, Uploading image isn't supported on GET Operation! Try POST!");
}

module.exports.putUploadImg = function putUploadImg(_req, res, next) {
    res.status(403).end("Oh my Bad!, Uploading image isn't supported on PUT Operation! Try POST!");
}

module.exports.deleteUploadImg = function deleteUploadImg(_req, res, next) {
    res.status(403).end("Oh my Bad!, Uploading image isn't supported on DELETE Operation! Try POST!");
}