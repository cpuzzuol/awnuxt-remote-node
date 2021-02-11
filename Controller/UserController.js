const express = require("express");
const { User } = require("../Models/User");
const bcrypt = require('bcryptjs');

const router = express.Router();

let ObjectId = require("mongoose").Types.ObjectId;

//GET http://localhost:3001/users
router.get("/", (req, res) => {
  User.find((err, docs) => {
    if (err)
      console.log(
        "Error while getting users..." + JSON.stringify(err, undefined, 2)
      );
    else res.send(docs);
  });
});

//POST http://localhost:3001/users/register
router.post("/register", async (req, res) => {
  let newUser = JSON.parse(req.body.newUser)
  try {
    const hashedPwd = await bcrypt.hash(newUser.password, 10)
    const user = await User.create({
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      password: hashedPwd,
      username: newUser.username,
      email: newUser.email
    })
    res.send(user)
  } catch (err) {
    console.log(err)
    res.status(500).send("Internal server error!")
  }
});

//POST http://localhost:3001/users/login
router.post("/login", async (req, res) => {
  let loginInfo = JSON.parse(req.body.loginInfo)

  User.findOne({ username: loginInfo.username }).then((usr) => {
    return bcrypt.compare(loginInfo.password, usr.password)
  })
    .then((match) => {
      if(!match) {
        res.status(403).send()
      }
      res.send()
    })
    .catch((err) => {
      console.log(err)
      res.status(500).send("Internal server error while logging in!")
    })
});

// //GET http://localhost:3000/customers/id
// router.get("/:id", (req, resp) => {
//   let customerId = req.params.id;
//   if (!ObjectId.isValid(customerId))
//     return resp.status(400).send(`Customer not found for id :${customerId}`);
//
//   Customer.findById(customerId, (err, docs) => {
//     if (err)
//       console.log(
//         "Error while getting customers..." + JSON.stringify(err, undefined, 2)
//       );
//     else resp.send(docs);
//   });
// });
//
// //DELETE http://localhost:3000/customers/id
// router.delete("/:id", (req, resp) => {
//   let customerId = req.params.id;
//   if (!ObjectId.isValid(customerId))
//     return resp.status(400).send(`Customer not found for id :${customerId}`);
//
//   Customer.deleteOne({ _id: customerId }, (err, docs) => {
//     if (err)
//       console.log(
//         "Error while deleting customers..." + JSON.stringify(err, undefined, 2)
//       );
//     else resp.send(docs);
//   });
// });
//
// //PUT http://localhost:3000/customers/id
// router.put("/:id", (req, resp) => {
//   let customerId = req.params.id;
//   if (!ObjectId.isValid(customerId))
//     return resp.status(400).send(`Customer not found for id :${customerId}`);
//
//   Customer.findByIdAndUpdate(
//     customerId,
//     {
//       $set: {
//         first_name: req.body.first_name,
//         last_name: req.body.last_name,
//         gender: req.body.gender,
//         age: req.body.age,
//         email: req.body.email
//       }
//     },
//     { new: true, useFindAndModify: false },
//     (err, doc) => {
//       if (err)
//         console.log(
//           "Error while uppdating customers..." +
//             JSON.stringify(err, undefined, 2)
//         );
//       else resp.send(doc);
//     }
//   );
// });
//


module.exports = router;
