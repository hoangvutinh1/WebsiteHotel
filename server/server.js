require('dotenv').config();
const bcrypt =require('bcryptjs')
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const utils = require('./utils');
const app = express();
var mysql = require('mysql');
const port = process.env.PORT || 4000;

app.use(express.json())

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'website'
})
connection.connect(function (err) {
    if (err)
        throw err
    else {
        console.log('Connected to MySQL');
       
    }
});



// enable CORS
app.use(cors());

// parse application/json
app.use(bodyParser.json());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const customMiddleware = (req, res, next) => {
    var token = req.headers['authorization'];
    if (!token) return res.status(401).json({
        error: "you must logged in"
    }); //if no token, continue

    token = token.replace('Bearer ', '');
    jwt.verify(token, process.env.JWT_SECRET, function (err, user) {
        if (err) {
            return res.status(401).json({
                error: true,
                message: "Invalid user."
            });
        } else {
            req.user = user; //set the user to req so other routes can use it
            next();
        }
    });
}

//middleware that checks if JWT token exists and verifies it if it does exist.
//In all future routes, this helps to know if the request is authenticated or not.
app.use(function (req, res, next) {
    // check header or url parameters or post parameters for token
    var token = req.headers['authorization'];
  
    if (!token) return next(); //if no token, continue

    token = token.replace('Bearer', '');
    jwt.verify(token, process.env.JWT_SECRET, function (err, user) {
        if (err) {
            console.log(err)
            return res.status(401).json({
                error: true,
                message: "Invalid user."
            });
        } else {
            req.user = user; //set the user to req so other routes can use it
            next();
        }
    });
});


// request handlers


app.post('/login', function (req, res) {
    
    const user = req.body.username;
    const pwd = req.body.password;
    // return 400 status if username/password is not exist
    if (!user || !pwd) {
        return res.status(400).json({
            error: true,
            message: "Username or Password required."
        });
    }
    connection.query(`Select * from user where username='${user}'`, function (err, result) {
        // check header or url parameters or post parameters for token

        if (result.length>0) {
            
            const isPasswordCorrect = bcrypt.compare(pwd, result[0].password);
            if (isPasswordCorrect) {
                const token = utils.generateToken(result[0]);

                const userObj = utils.getCleanUser(result[0]);

                return res.json({ user: userObj, token });
            }
            return res.status(401).json({
                error: true,
                message: "Username or Password is Wrong."
            });
        }
        else {
            console.log("uesrname is not exist")
            return res.status(401).json({
                error: true,
                message: "Tên đăng nhập hoặc mật khẩu không hợp lệ"
            });
        }
    })

})
app.get('/comment', function (req, res) {
    const comments = connection.query("SELECT * from comment", function (err, result) {
        if (err) throw err;
        return res.json({ comment: result })
    });

})

app.get('/rooms', (req, res) => {
    const rooms = connection.query("SELECT * from rooms", function (err, result) {
        if (err) throw err;
        return res.json({ rooms: result })
    });

})

app.post('/order/:slug', customMiddleware, async (req, res)=> {
    const user = req.body.name;
    var check = false;
    const username=req.body.username
    const phone = req.body.phone;
    const roomNumber = req.body.roomNumber;
    const startDate =req.body.startDate;
    const endDate = req.body.endDate;
    console.log(startDate==='2021-08-10')
    await connection.query(`SELECT * from orders where room_number='${roomNumber}'`, async (err, result)=> {
        if (err) throw err;
        
        for (let i = 0; i < result.length; i++)
        {

            
            if ((result[i].end_date >=endDate && result[i].start_date <=endDate) ||
                (result[i].end_date >=startDate && result[i].start_date <=startDate))
            {
                
                return res.json({
                    error: true,
                    message: "Phòng đã có người đặt trước, vui lòng chọn phòng khác"
                });
            }
        }
        await connection.query(`INSERT INTO orders(room_number,user,username,phone,start_date,end_date) VALUES('${roomNumber}','${user}','${username}','${phone}','${startDate}','${endDate}')`, function (err, result) {
            if (err) {
                console.log(err)
                return res.json({
                    error: true,
                    message: "Đã có lỗi xảy ra, vui lòng thử lại sau"
                });
            }
            else {
                
                return res.json({
                    error: false,
                    message: "Đặt phòng thành công"
                })
            }

        });
        
    }); 
   
    

})
app.post('/signup', function (req, res) {
    const username = req.body.username;
    const password = req.body.password;
    const name = req.body.name;
    const phone = req.body.phone;
    // return 400 status if username/password is not exist
    if (!username || !password) {
        return res.json({
            error: true,
            message: "Username or Password required."
        });
    }
    connection.query("Select * from user", function (err, result) {
        // check header or url parameters or post parameters for token

        for (let i = 0; i < result.length; i++) {

            if (result[i].username === username)

                return res.json({
                    error: true,
                    message: "Username is exist."
                });
        }
        connection.query(`INSERT INTO user(username,password,name,phone) VALUES('${username}','${password}','${name}','${phone}')`, function (err, result) {
            if (err) {
                console.log(err)
                return res.json({
                    error: true,
                    message: "Something went Wrong"
                });
            }
            return res.json({
                error: false,
                message: "Đăng ký tài khoản thành công"
            });
        });

    })


});

/* app.get('/verifyToken', function (req, res) {
    // check header or url parameters or post parameters for token
    var token = req.body.token || req.query.token;
    if (!token) {
        return res.status(400).json({
            error: true,
            message: "Token is required."
        });
    }
    // check token that was passed by decoding token using secret
    console.log(token)
   /*  jwt.verify(token, process.env.JWT_SECRET, function (err, user) {
        if (err) return res.status(401).json({
            error: true,
            message: "Invalid token."
        });

        // return 401 status if the userId does not match.
        if (user.userId !== userData.userId) {
            return res.status(401).json({
                error: true,
                message: "Invalid user."
            });
        }
        // get basic user details
        var userObj = utils.getCleanUser(userData);
        return res.json({ user: userObj, token });
    });
});  */

app.post("/saveComment", (req, res) => {
    const comment = req.body
    
    connection.query(`INSERT INTO COMMENT(ROOM_SLUG,POSTBY,CONTENT,CREATE_TIME) VALUES('${comment.room_slug}','${comment.postby}','${comment.content}','${comment.create_time}')`, function (err, result) {
        if (err) console.log(err);
       
        return res.json({ comment: comment })
      
    });


})
app.listen(port, () => {
    console.log('Server started on: ' + port);
});
