import React, {useEffect} from 'react'
import Layout from "../../components/layout";
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "../../pages/api/auth/[...nextauth]";
import clientPromise from "../../lib/mongodb";
import { useAuthContext } from "../../context/authContext";
import { useRouter } from "next/router";


export default function Admin() {
  const authContext = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    console.log("all users");
  }, []);
  

  useEffect(() => {
    if (
      (!authContext.user || authContext.user.role !== "admin") &&
      !authContext.isUserLoading
    ) {
      router.push("/");
    }
  }, [authContext.user]);
  

  return (
    <Layout>
        <h1>Hi</h1>
        <h1>Admin</h1>
      {authContext.user && authContext.user.role === "admin" && <div>{authContext.user.role}</div>}
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
