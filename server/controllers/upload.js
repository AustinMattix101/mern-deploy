    // Upload
    const multer = require('multer');
    const { diskStorage } = require('multer');

    module.exports = function Upload() {
    
    const arrivals = "assets/file";
    const storage = diskStorage({
                destination: (req, file, cb) => {
                    cb(null, arrivals);
                }, 
                filename: (req, file, cb) => {
                    cb(null, file.originalname);
                }
            });
    
    const FileFiltering =  (req, file, cb) => {
        if (!file.originalname.match(/\.(txt|json|js|jsx|ts|tsx|py|cpp|c|vb|vbs|cs|java|php|css|sass|xml|html|md|pdf|docx|zip|rar|bat|cmd|ps1|sh|zsh)$/)) {
            return cb(new Error('You can upload only specific file check, the documentation!'), false)
        } else {
            cb(null, true);
        }
    }    
    
    const upload = multer({ storage: storage, fileFilter: FileFiltering });
    
        return upload;
      
    }
    
        // Controller 
    module.exports.postUpload = function postUpload(req, res) {
            res.status(201).setHeader("Content-Type", "application/json").json(`File: ${req.file} or Files ${req.files} `);
    }
    
    module.exports.getUpload = function getUpload(_req, res, next) {
            res.status(403).end("Oh my Bad!, Uploading file isn't supported on GET Operation! Try POST!");
    }
    
    module.exports.putUpload = function putUpload(_req, res, next) {
        res.status(403).end("Oh my Bad!, Uploading file isn't supported on PUT Operation! Try POST!");
    }
    
    module.exports.deleteUpload = function deleteUpload(_req, res, next) {
        res.status(403).end("Oh my Bad!, Uploading file isn't supported on DELETE Operation! Try POST!");
    }