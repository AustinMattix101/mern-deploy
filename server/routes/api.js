const { getAPI, getCamunitedAPI } = require("../controllers/api.js");
const { protect, AdminProtect } = require("../middlewares/auth.js");
const { corsWithOptions } = require("../middlewares/cors.js");
const { Router} = require("express");
const {  // Hotel
    postHotel, 
    updateHotel,
    deleteHotel,
    findHotels,
    findHotel,
    countByCity,
    countByType
} = require("../controllers/api.js");
const { // Room
    postRoom,
    updateRoom,
    deleteRoom,
    findRooms,
    findRoom,
} = require("../controllers/api.js");

const apiRouter = Router();

apiRouter
    .route("/")
    .options(corsWithOptions)
    .get(getAPI);

apiRouter
    .route("/camunited")
    .options(corsWithOptions)
    .get(getCamunitedAPI);

    // Hotel
apiRouter
    .route('/hotel')
    .options(corsWithOptions)
    .post(protect, AdminProtect, postHotel);

apiRouter
    .route('/hotel/:id')
    .options(corsWithOptions)
    .put(protect, AdminProtect, updateHotel);

apiRouter
    .route('/hotel/:id')
    .options(corsWithOptions)
    .delete(protect, AdminProtect, deleteHotel);

apiRouter
    .route('/hotel')
    .options(corsWithOptions)
    .get(protect, findHotels);

apiRouter
    .route('/hotel/find/:id')
    .options(corsWithOptions)
    .get(protect, findHotel);

    // Hotel Query
apiRouter
    .route('/hotel/countByCity')
    .options(corsWithOptions)
    .get(protect, countByCity);

apiRouter
    .route('/hotel/countByType')
    .options(corsWithOptions)
    .get(protect, countByType);
    // Room
apiRouter
    .route('/room/:hotelid')
    .options(corsWithOptions)
    .post(protect, postRoom);

apiRouter
    .route('/room/:id')
    .options(corsWithOptions)
    .put(protect, updateRoom);

apiRouter
    .route('/room/:id/:hotelid')
    .options(corsWithOptions)
    .delete(protect, deleteRoom);

apiRouter
    .route('/room')
    .options(corsWithOptions)
    .get(protect, findRooms);

apiRouter
    .route('/room/:id')
    .options(corsWithOptions)
    .get(protect, findRoom);

module.exports = apiRouter;