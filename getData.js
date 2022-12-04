let db=require('../../index1');
let sequelize=db.sequelize;
let Sequelize=db.Sequelize;
let data=db.Data;

 const getData=(req,res)=>{
    if(data==undefined){
        res.status(200).send({
            message:"you data is undefined"
        })
        return;
    }
    let promise=data.findAll();
    promise
    .then((data)=>{
        res.status(200).send(data);
    })

    .catch((err)=>{
        res.status(500).send({
            message:"Some internal erro while fetching the categories"
        })
    })
}
module.exports=getData;