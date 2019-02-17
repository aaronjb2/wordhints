const express = require('express');
require('dotenv').config();
const massive = require('massive');
const socket = require('socket.io');
const controller = require('./controller.js');
const session = require('express-session');

const app = express();

app.use(express.json());
const {SERVER_PORT, MASSIVE_CONNECTION, SESSION_SECRET} = process.env;

app.use(session({
    secret: SESSION_SECRET,
    resave:false,
    saveUninitialized:false
}))

app.use( express.static( `${__dirname}/../build` ) );

const io = socket(
    app.listen(SERVER_PORT, () => {
        console.log(`On the ${SERVER_PORT}th day of Christmas my true love gave to me..... nothing because I'm single`);
    })
)

app.get('/test/word',(req,res,next)=>{
    res.status(200).send({word:"taco"});
})
app.get('/board/checkforboard/:room',controller.checkForBoard);
app.get('/room/getsession',controller.getSession);
app.post('/board/generateboard',controller.generateBoard);
app.get('/board/gethistory/:room',controller.getHistory);
app.put('/board/addhistory',controller.addHistory);
app.post('/room/joinsession',controller.joinSession);
app.delete('/room/destroysession',controller.destroySession);
app.put('/room/selectuse',controller.selectUse);
app.delete('/board/deletegame/:room',controller.deleteGame);


massive(MASSIVE_CONNECTION).then(db=> {
    app.set('db', db);
    console.log('db is connected');
})

io.on("connection", socket => {

    socket.on("join-room",data=>{
        console.log('inside join-room with room:',data.room)
        socket.join(data.room);
    })

    socket.on("update",data=>{
        console.log('inside update with room:',data.room);
        io.to(data.room).emit("update");
    })

})


