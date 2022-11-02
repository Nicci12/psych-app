import clientPromise from "../../../../lib/mongodb";
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]";

export default async (req, res) => {
  const session = await unstable_getServerSession(req, res, authOptions);
  const method = req.method;
  const email = req.query.email;
  
  if (session) {
    const client = await clientPromise;
    const db = client.db();
   
    switch (method) {
      case 'GET':
        console.log(email)
        let user = await db.collection("users").findOne({ email: email });

        if (user) {
          const existingUser = {
            email: email,
          };
          const updateDocument = {
            $set: {
              last_login: new Date(),
              name: session.user.name,
              image: session.user.image,
            },
          };
          await db.collection("users").updateOne(existingUser, updateDocument);
        } else {
          const newUser = {
            email: email,
            name: session.user.name,
            image: session.user.image,
            role: "guest",
            date_created: new Date(),
            last_login: new Date(),
          };
          const userDB = await db.collection("users").insertOne(newUser);
          user = {
            ...newUser,
            _id: userDB.insertedId,
          };
        }
        res.status(200).json({ user })
        break
      case 'PUT':
        // Update or create data in your database
        res.status(200).json({})
        break
      default:
        res.setHeader('Allow', ['GET', 'PUT'])
        res.status(405).end(`Method ${method} Not Allowed`)
      }
    res.json({ user: "get user" });
  } else {
    res.json({
      error: "You must be sign in to view the protected content on this page.",
    });
  }
};
