const { Router } = require("express");
const { corsWithOptions } = require("../middlewares/cors.js");
const PreferedTwoFA = require("../middlewares/preferedTwoFA.js");
const { protect } = require("../middlewares/auth.js");
const { 
        InitOnlyEmailConfirmation,
        InitpreferedTwoFAOption
    } = require("../middlewares/init.js");
const { 
        getTwoFA,
        getTwoFAOn,
        getTwoFAOff,
        postTwoFARegister, 
        postTwoFAVerify, 
        postTwoFAValidate, 
} = require("../controllers/TwoFA.js");

const TwoFARouter = Router();

TwoFARouter
        .route("/")
        .options(corsWithOptions)
        .get(getTwoFA);

TwoFARouter
        .route("/on")
        .options(corsWithOptions)
        .get(
                protect, 
                InitOnlyEmailConfirmation, 
                getTwoFAOn
        );

TwoFARouter
        .route("/off")
        .options(corsWithOptions)
        .get(
                protect, 
                InitOnlyEmailConfirmation,
                InitpreferedTwoFAOption,
                getTwoFAOff
        );

TwoFARouter
        .route("/generate")
        .options(corsWithOptions)
        .post(
                protect, 
                InitOnlyEmailConfirmation,
                PreferedTwoFA, 
                postTwoFARegister
        );

TwoFARouter
        .route("/verify")
        .options(corsWithOptions)
        .post(
                protect,
                InitOnlyEmailConfirmation,
                PreferedTwoFA, 
                postTwoFAVerify
        );

TwoFARouter
        .route("/validate")
        .options(corsWithOptions)
        .post(
                protect, 
                InitOnlyEmailConfirmation,
                PreferedTwoFA, 
                postTwoFAValidate
        );

module.exports = TwoFARouter;