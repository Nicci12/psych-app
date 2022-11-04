import clientPromise from "../../../../lib/mongodb";
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]";
let mongo = require("mongodb");


export default async (req, res) => {
  const session = await unstable_getServerSession(req, res, authOptions);
  const method = req.method;
  const email = req.query.email;
  
  if (session) {
    const client = await clientPromise;
    const db = client.db();
   
    switch (method) {
      case 'GET':
        let user = await db.collection("users").findOne({ email: email });
        res.status(200).json({ user })
        break
      case 'PUT':
        const parsedReq = JSON.parse(req.body);
        const userObjId = new mongo.ObjectID(parsedReq.user_id);
         console.log(userObjId)
        const existingUser = {
          _id: userObjId,
        };
        const updates = {};
        Object.keys(parsedReq).forEach((item) => {
          if (item !== "user_id") {
            updates[item] = parsedReq[item];
          }
        });

        const updateDocument = {
          $set: { details: { ...updates } },
        };

        const responseDB = db.collection("users").updateOne(existingUser, updateDocument);
        console.log(responseDB);
        
        res.json({ message: responseDB.acknowledged});
        break
      default:
        res.setHeader('Allow', ['GET', 'PUT'])
        res.status(405).end(`Method ${method} Not Allowed`)
      }
  } else {
    res.json({
      error: "You must be sign in to view the protected content on this page.",
    });
  }
};


// export default async (req, res) => {
//   const session = await unstable_getServerSession(req, res, authOptions);
//   const method = req.method;
//   const email = req.query.email;
//   if (session) {
//     const client = await clientPromise;
//     const db = client.db();
//     switch (method) {
//       case "GET":
//         console.log(email);
//         let user = await db.collection("users").findOne({ email: email });

//         if (user) {
//           const existingUser = {
//             email: email,
//           };
//           const updateDocument = {
//             $set: {
//               last_login: new Date(),
//               name: session.user.name,
//               image: session.user.image,
//             },
//           };
//           await db.collection("users").updateOne(existingUser, updateDocument);
//         } else {
//           const newUser = {
//             Email: email,
//             Name: session.user.name,
//             image: session.user.image,
//             Role: "Guest",
//             date_created: new Date(),
//             last_login: new Date(),
//           };
//           const userDB = await db.collection("users").insertOne(newUser);
//           user = {
//             ...newUser,
//             _id: userDB.insertedId,
//           };
//         }
//         res.status(200).json({ user });
//         break;
//       case "PUT":
//         const parsedReq = JSON.parse(req.body);
//         console.log(parsedReq);
//         res.status(200).json({ user: "update user" });
//         break;
//       default:
//         res.setHeader("Allow", ["GET", "PUT"]);
//         res.status(405).end(`Method ${method} Not Allowed`);
//     }
//     // res.json({ user: "get user" });
//   } else {
//     res.json({
//       error: "You must be sign in to view the protected content on this page.",
//     });
//   }
// };
