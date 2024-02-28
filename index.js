// const express = require('express');
// const mongoose = require('mongoose');
// const dotenv = require('dotenv');
// const User = require('./models/User');

// const cors = require('cors');

// const jwt = require('jsonwebtoken');
// dotenv.config();
// try {
//     await mongoose.connect(process.env.MONGO_URL);
//     console.log('Connected to MongoDB');
// } catch (err) {
//     console.error('Error connecting to MongoDB:', err);
// }

// const jwtSecret = process.env.JWT_SECRET;

// const app = express();
// app.use(express.json());
// app.use(cors({
//     credentials: true,
//     origin: process.env.CLIENT_URL,
// }));
// app.get('/test', (req,res) => {
//     res.json('test ok');
// });



// app.post('/register', async (req,res) => {
//     console.log(req.body);
//     const {username,password} = req.body;
//     try {
//         const createdUser = await User.create({username,password});
//         jwt.sign({userId:createdUser._id},jwtSecret, {}, (err,token) => {
//             if (err) throw err;
//             res.cookie('token', token).status(201).json('ok');
//         });
//     } catch(err) {
//         if (err) throw err;
//         res.status(500).json('error')
//     }
    
    
// });

// // app.post('/register', async (req, res) => {
// //     const { username, password } = req.body;
// //     try {
// //         const CreatedUser = await User.create({ username, password });
// //         jwt.sign({ userId: CreatedUser._id }, jwtSecret, {}, (err, token) => {
// //             if (err) {
// //                 console.error('Error creating JWT token:', err);
// //                 return res.status(500).json({ error: 'Internal Server Error' });
// //             }
// //             res.cookie('token', token).status(201).json('ok');
// //         });
// //     } catch (err) {
// //         console.error('Error creating user:', err);
// //         res.status(500).json({ error: 'Internal Server Error' });
// //     }
// // });


// app.listen(4000);




const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const User = require('./models/User');
const Message = require('./models/Message');
const bcrypt = require('bcryptjs');
const ws = require('ws');
const cors = require('cors');

const jwt = require('jsonwebtoken');
const UserModel = require('./models/User');

async function startServer() {
    dotenv.config();

    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error('Error connecting to MongoDB:', err);
    }

    const jwtSecret = process.env.JWT_SECRET;
    const bcryptSalt = bcrypt.genSaltSync(10);

    const app = express();
    app.use(express.json());
    app.use(cookieParser());
    app.use(cors({
        credentials: true,
        origin: process.env.CLIENT_URL,
    }));
//     expressWs(app);

// app.ws('/', (ws, req) => {
//     console.log('WebSocket connection established');
//     // Handle WebSocket logic here
// });

    async function getUserDataFromRequest(req) {
        return new Promise((resolve, reject) => {
                const token = req.cookies?.token;
                if (token) {
                jwt.verify(token, jwtSecret, {}, (err, userData) => {
                    if (err) throw err;
                    resolve(userData);
                });
            } else {
                reject('no token');
            } 
        });
    }

    app.get('/test', (req, res) => {
        const {userId} = req.params;
    });

    app.get('/messages/:userId', async (req,res) => {
        const {userId} = req.params;
        const userData = await getUserDataFromRequest(req);
        const ourUserId = userData.userId;
        const messages = await Message.find({
            sender:{$in:[userId,ourUserId]},
            recipient:{$in:[userId,ourUserId]},
        }).sort({createdAt: 1});
        res.json(messages);
    });

    app.get('/people', async (req,res) => {
        const users = await User.find({}, {'_id':1,username:1});
        res.json(users);
    });

    app.get('/profile', (req,res) => {
        const token = req.cookies?.token;
        if (token) {
            jwt.verify(token, jwtSecret, {}, (err, userData) => {
                if (err) throw err;
                res.json(userData);
            });
        } else {
            res.status(401).json('no token');
        }
        
    });

    app.post('/login', async (req,res) => {
        const {username,password} = req.body;
        const foundUser = await User.findOne({username});
        if (foundUser) {
            const passOk = bcrypt.compareSync(password, foundUser.password);
            if (passOk) {
                jwt.sign({userId: foundUser._id,username}, jwtSecret, {}, (err, token) => {
                    res.cookie('token', token, {sameSite:'none', secure:true}).json({
                        id: foundUser._id,
                    });
                });
            }
        }
    });

    app.post('/logout', (req,res) => {
        res.cookie('token', '', {sameSite:'none', secure:true}).json('ok');
    });

    app.post('/register', async (req, res) => {
        console.log(req.body);
        const { username, password } = req.body;
        try {
            const hashedPassword = bcrypt.hashSync(password, bcryptSalt);
            const createdUser = await User.create({ 
                username:username, 
                password: hashedPassword,
            });
            jwt.sign({ userId: createdUser._id,username}, jwtSecret, {}, (err, token) => {
                if (err) throw err;
                res.cookie('token', token, {sameSite:'none', secure:true}).status(201).json({
                    id: createdUser._id, 
                });
            });
        } catch (err) {
            console.error(err);
            res.status(500).json('error');
        }
    });

    const server = app.listen(4040);

    const wss = new ws.WebSocketServer({server});
    wss.on('connection', (connection, req) => {

        function notifyAboutOnlinePeople() {
            [...wss.clients].forEach(client => {
                client.send(JSON.stringify({
                  online: [...wss.clients].map(c => ({userId:c.userId,username:c.username}))  
                }));
           });
        }

        connection.isAlive = true;

        connection.timer = setInterval(() => {
            connection.ping();
            connection.deathTimer = setTimeout(() => {
                connection.isAlive = false;
                clearInterval(connection.timer);
                connection.terminate();
                notifyAboutOnlinePeople();
            }, 1000);
        }, 5000);

        connection.on('pong', () => {
            clearTimeout(connection.deathTimer);
        });

        //read username and ID from the cookie for this connection
        const cookies = req.headers.cookie;
        if(cookies) {
            const tokenCookieString = cookies.split(';').find(str => str.startsWith('token='));
            console.log(tokenCookieString);
            if(tokenCookieString) {
                const token = tokenCookieString.split('=')[1];
                if(token) {
                    jwt.verify(token, jwtSecret, {}, (err, userData) => {
                        if (err) throw err;
                        const {userId, username} = userData;
                        connection.userId = userId;
                        connection.username = username;
                    });
                }
            }
        }

        connection.on('message', async (message) => {
            const messageData = JSON.parse(message.toString());
            const {recipient, text} = messageData;
            if (recipient && text) {
                const messageDoc = await Message.create({
                    sender:connection.userId,
                    recipient,
                    text,
                });
                [...wss.clients]
                .filter(c => c.userId === recipient)
                .forEach(c => c.send(JSON.stringify({
                    text,
                    sender:connection.userId,
                    recipient,
                    _id:messageDoc._id,
                })));
            }
        });
        //notify everyone about connected people
       notifyAboutOnlinePeople();
    });


    
   

}

startServer();
