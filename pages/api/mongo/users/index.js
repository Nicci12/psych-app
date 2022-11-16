import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]";
import clientPromise from "../../../../lib/mongodb";

export default async (req, res) => {
  const session = await unstable_getServerSession(req, res, authOptions);
  const email = req.query.email;
  if (session) {
    const method = req.method;
    const client = await clientPromise;
    const db = client.db();

    let user = await db
      .collection("users")
      .findOne({ email: session.user.email });

    switch (method) {
      case "GET":
        if (user && user.role === "admin") {
          const allUsersPromise = await db.collection("users").find();
          const users = await allUsersPromise.toArray();
          res.status(200).json({ users });
          break;
        } else {
          res.status(405).end(`No access`);
          break;
        }
      default:
        res.setHeader("Allow", ["GET"]);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
  } else {
    res.json({
      error: "You must be sign in to view the protected content on this page.",
    });
  }
};