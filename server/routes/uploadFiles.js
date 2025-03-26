const { Router } = require('express');
const { protect } = require("../middlewares/auth.js");
const { corsWithOptions } = require("../middlewares/cors.js");
const Upload = require("../controllers/upload.js");
const { postUpload, getUpload, putUpload, deleteUpload } = require("../controllers/upload.js");
const { 
    InitOnlyEmailConfirmation,
    InitpreferedTwoFAOption 
} = require("../middlewares/init.js");

const uploadRouter = Router();

const key = "Files";
const upload = new Upload;

uploadRouter
    .route('/')
    .options(corsWithOptions)
        .post(
            protect,
            InitOnlyEmailConfirmation,
            InitpreferedTwoFAOption, 
            upload.array(key, 5),
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

module.exports = uploadRouter;