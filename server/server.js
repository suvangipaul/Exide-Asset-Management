const express = require('express');
const app = express();
const cors = require('cors')
const mongoose = require('mongoose');

const db = require('./config/keys').MongoURI;

const { User, Crud } = require('./model/login_regis');

//deploy
app.use(cors());

//body Parser
// app.use(express.urlencoded({
//     extended: true
// }));
// app.use(express.json());
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Connect to Database
mongoose.connect(db, { useNewUrlParser: true })
    .then(() => console.log('Database Connected...'))
    .catch(err => console.log(err));



//Routes
app.post('/signup', (req, res) => {

    const userName = req.body.user,
        email = req.body.email,
        password = req.body.pass;

    console.log(userName, ' ', email, ' ', password);

    User.findOne({ userName: userName })
        .then(user => {
            if (user) {
                res.json("User already exist");
            } else {
                const newUser = new User({ userName, email, password });
                newUser.save()
                    .then(user => res.json("User added"))
                    .catch(err => console.log(err));
            }
        })
})

app.post('/', (req, res) => {

    const { userName, pass } = req.body;
    console.log(userName, ' ', pass);


    console.log("test", req.body)
    console.log({ userName: userName, password: pass })
    User.findOne({ userName: userName, password: pass })
        .then(user => {
            if (!user)
                res.json({ 'userName': userName });
            else {
                res.json("pass");
            }
        })
        .catch(err => console.log(err));
})

//Landing Page
app.get('/LandingPage', (req, res) => {

    //Desktops, laptop, Servers, Printers, N/W Switches
    let ans = [0, 0, 0, 0, 0];

    Crud.find({})
        .then(users => {

            //if no user exists
            if (!users) {
                res.json("no user exists");
            } else {
                users.map(user => {
                    if (user.type === 'Desktop')
                        ans[0]++;
                    else if (user.type === 'Laptop') ans[1]++;
                    else if (user.type === 'Server') ans[2]++;
                    else if (user.type === 'Printer') ans[3]++;
                    else if (user.type === 'N-W Switches') ans[4]++;
                })
                for (let it = 0; it < ans.length; it++)
                    console.log(ans[it], "\n");
                res.json(ans);
            }
        })
        .catch(err => console.log(err));
});

//ADD ELEMENTS

app.post('/FuncPage/addelements', (req, res) => {

    const { type, make, model, serialNo, dateOfPurchase, noOfYears, autoInput } = req.body;
    console.log(serialNo, ' ', autoInput);

    Crud.findOne({ assetTag: autoInput })
        .then(user => {
            if (!user) {
                const newCrud = new Crud({ type, make, model, serialNo, dateOfP: dateOfPurchase, noOfYears, assetTag: autoInput });
                newCrud.save()
                    .then(user => res.json("User added"))
                    .catch(err => console.log(err));

            } else {
                res.json("Record already present");
            }
        })
        .catch(err => console.log(err));
})

//EDIT ELEMENTS

app.get('/FuncPage/editelements', (req, res) => {

    Crud.find({})
        .then(users => {

            //if no user exists
            if (!users) {
                res.json("no user exists");
            } else {
                let arr = [];

                users.map(user => { arr.push(user.assetTag); })
                    /*for(let it = 0;it < arr.length;it++)
                      console.log(arr[it]);*/
                res.json(arr);
            }
        })
        .catch(err => console.log(err));
})

app.post('/FuncPage/editelements', (req, res) => {

    const assetTag = req.body.value;
    //console.log(assetTag);

    Crud.find({ assetTag: assetTag })
        .then(users => {

            //if no user exists
            if (!users) {
                res.json("no user exists");
            } else {
                let arr = [];

                users.map(user => {
                        arr.push(user.type);
                        arr.push(user.make);
                        arr.push(user.model);
                        arr.push(user.serialNo);
                        arr.push(user.dateOfP);
                        arr.push(user.noOfYears);
                        arr.push(user.assetTag);
                    })
                    /*for(let it = 0;it < arr.length;it++)
                      console.log(arr[it]); */
                res.json(arr);
            }
        })
        .catch(err => console.log(err));
})

app.put('/FuncPage/editelements', (req, res) => {

    const { type, make, model, serialNo, dateOfP, noOfYears, assetTagFinal, assetTag } = req.body;
    // console.log(type, make, model, serialNo, dateOfP, noOfYears, assetTagFinal, assetTag );

    const UpdateData = async() => {
        let result = await Crud.updateOne({ assetTag: assetTag }, {
            $set: {
                type: type,
                make: make,
                model: model,
                serialNo: serialNo,
                dateOfP: dateOfP,
                noOfYears: noOfYears,
                assetTag: assetTagFinal
            }
        });
        console.warn(result);
    }

    UpdateData();
    res.json("update success");

})

//delete Elements

app.delete('/FuncPage/deleteelements', (req, res) => {

    const { assetTag } = req.body;
    console.log(assetTag);

    const DeleteData = async() => {
        let result = await Crud.deleteOne({ assetTag: assetTag });
        console.warn(result);
    }

    DeleteData();
    res.json("Delete success");

})

//Report

app.post('/FuncPage/report', (req, res) => {

    const type = req.body.value;
    console.log(type);

    if (type == "All") {
        Crud.find({})
            .then(users => {

                //if no user exists
                if (!users) {
                    res.json("no user exists");
                } else {
                    let arr = [];

                    users.map(user => { arr.push(user.assetTag); })
                    for (let it = 0; it < arr.length; it++)
                        console.log(arr[it], "\n");
                    res.json(arr);
                }
            })
            .catch(err => console.log(err));
    } else {
        Crud.find({ type: type })
            .then(users => {

                //if no user exists
                if (!users) {
                    res.json("no user exists");
                } else {
                    let arr = [];

                    users.map(user => { arr.push(user.assetTag); })
                        /*for(let it = 0;it < arr.length;it++)
                          console.log(arr[it]);*/
                    res.json(arr);
                }
            })
            .catch(err => console.log(err));
    }
})


//run server
const PORT = 5000 || process.env.PORT;

app.listen(PORT, () => console.log(`The app is running on port ${PORT}`));