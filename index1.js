let Sequelize = require('sequelize');
let express=require('express');
const { application } = require('express');
let app=express();
let useRoutes=require('./src/routes/getRoutes');
let bodyParser=require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use('/',useRoutes);

// connect to the database
const sequelize = new Sequelize('test', 'root', '', {
    host: '127.0.0.1',
    dialect: 'mysql'
});

//fetch the data from api
function fetchData() {
    fetch('https://api.wazirx.com/api/v2/tickers')
        .then((res) => res.json())
        .then((res) => {
            show(res);
        })
}

//initialize show data function
function show(res) {
    let i = 0;
    for (let num of Object.values(res)) {
        if (i <= 10) {
            var user = [{
                name: num.name,
                name: num.name,
                last: num.last,
                buy: num.buy,
                sell: num.sell,
                volume: num.volume,
                base_unit: num.base_unit
            }]
            pass(user);
            i++;

        }

    }
}
//call the fetch data function
fetchData();

//initialize the table using sequelize orm

const Data = sequelize.define('stock_details', {
    user_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    last: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    buy: {
        type: Sequelize.BIGINT,
        allowNull: false,
    },
    sell: {
        type: Sequelize.BIGINT,
        allowNull: false,
    },
    volume: {
        type: Sequelize.BIGINT,
        allowNull: false,
    },
    base_unit: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

//create the table using sequelize and sync function
Data.sequelize.sync({ force: true })
    .then(() => {
        console.log("table dropped and created",Data);
    })

function pass(data) {
    //put the data into database using bulk keyword
    Data.bulkCreate(data)
        .then(() => {
            console.log('table create successfully');
        })
        .catch(() => {
            console.log("error ocur is the create your table");
        })
}


/**
 * Fetch the data from mysql to user interface page
 * 
 * 
 */
 app.listen(8080,()=>{
    console.log("server started is successfully");
})


let db={

};
db.Sequelize=Sequelize;
db.sequelize=sequelize;
db.Data=Data;
module.exports=db;


