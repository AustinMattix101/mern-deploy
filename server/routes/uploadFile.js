const { Router } = require('express');
const { protect } = require("../middlewares/auth.js");
const { corsWithOptions } = require("../middlewares/cors.js");
const { 
    InitOnlyEmailConfirmation,
    InitpreferedTwoFAOption 
} = require("../middlewares/init.js");

const Upload = require("../controllers/upload.js");
const { postUpload, getUpload, putUpload, deleteUpload } = require("../controllers/upload.js");

const UploadImg = require("../controllers/uploadImg.js");
const { postUploadImg, getUploadImg, putUploadImg, deleteUploadImg } = require("../controllers/uploadImg.js");

const uploadRouter = Router();

const key = "File";
const upload = new Upload;

const keyImg = "imageFile";
const uploadImg = new UploadImg;

uploadRouter
    .route('/')
    .options(corsWithOptions)
        .post(
            protect,
            InitOnlyEmailConfirmation, 
            InitpreferedTwoFAOption, 
            upload.single(key),
            postUpload
            )
        
        .get(
            protect,
            InitOnlyEmailConfirmation, 
            InitpreferedTwoFAOption, 
            getUpload, 
            err => next(err)
        )

        .put(
            protect, 
            InitOnlyEmailConfirmation, 
            InitpreferedTwoFAOption,
            putUpload, 
            err => next(err))

        .delete(
            protect, 
            InitOnlyEmailConfirmation, 
            InitpreferedTwoFAOption,
            deleteUpload, 
            err => next(err));

uploadRouter
    .route('/img')
    .options(corsWithOptions)
        .post(
            protect, 
            InitOnlyEmailConfirmation,
            InitpreferedTwoFAOption,
            uploadImg.single(keyImg),
            postUploadImg
            )
        
        .get( 
            protect, 
            InitOnlyEmailConfirmation,
            InitpreferedTwoFAOption,
            getUploadImg, 
            err => next(err)
        )

        .put( 
            protect, 
            InitOnlyEmailConfirmation,
            InitpreferedTwoFAOption,
            putUploadImg, 
            err => next(err))

        .delete( 
            protect, 
            InitOnlyEmailConfirmation,
            InitpreferedTwoFAOption,
            deleteUploadImg, 
            err => next(err));

module.exports = uploadRouter;