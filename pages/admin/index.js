import React, { useEffect, useState } from "react";
import Layout from "../../components/layout";
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "../../pages/api/auth/[...nextauth]";
import clientPromise from "../../lib/mongodb";
import { useAuthContext } from "../../context/authContext";
import { useRouter } from "next/router";
import { getAllUsers } from "../../lib/mongo/users";
import UserProfile from "../../components/UserProfile";
import adminStyles from "../../styles/admin.module.css"

export default function Admin() {
  const authContext = useAuthContext();
  const router = useRouter();
  const [allUsers, setAllUsers] = useState();

  useEffect(() => {
    if (authContext.user && authContext.user.role === "admin") {
      getAllUsers().then((response) => setAllUsers(response.users));
    }
  }, [authContext.user]);

  useEffect(() => {
    console.log(allUsers);
  }, [allUsers]);

  return (
    <Layout>
      <div className={adminStyles.admin}>
        <h1>Admin Page</h1>
        {authContext.user && authContext.user.role === "admin" && (
          <div>
            {allUsers &&
              allUsers.map((userObj) => {
                return <UserProfile user={userObj} component="admin" />;
              })}
          </div>
        )}
      </div>
    </Layout>
  );

}

export async function getServerSideProps(context) {
  const { req, res } = context;
  try {
    const session = await unstable_getServerSession(req, res, authOptions);
    if (!session || !session.user) {
      return {
        redirect: {
          permanent: false,
          destination: `/`,
        },
      };
    }

    const client = await clientPromise;
    const db = client.db();
    const user = await db
      .collection("users")
      .findOne({ email: session.user.email });

    if (user && user.role !== "admin") {
      return {
        redirect: {
          permanent: false,
          destination: `/my-profile`,
        },
      };
    } else if (!user) {
      return {
        redirect: {
          permanent: false,
          destination: `/`,
        },
      };
    }

    return { props: {} };
  } catch (e) {
    console.error("uh oh");
    return;
  }
}
