let express =require('express');
let router=express.Router();
let getData=require('../controllers/getData.js');


router.get('/api',getData);

module.exports=router;