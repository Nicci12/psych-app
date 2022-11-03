import React, { useEffect, useState } from "react";
import Layout from "../../components/layout";
import { useAuthContext } from "../../context/authContext";
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "../../pages/api/auth/[...nextauth]";
import profileStyles from "../../styles/profile.module.css";
import { updateUserProfile } from "../../lib/mongo/users";


export default function MyProfile() {
  const authContext = useAuthContext();
  const [formData, setFormData] = useState();
  
  const handleInputChange = (e, inputKey) => {
    setFormData({ ...formData, [inputKey]: e.target.value });
  };
  
  useEffect(() => {
    console.log("form data", formData);
  }, [formData]);
  
  
  const handleSaveClicked = async () => {
    const response = await updateUserProfile(formData);
    console.log(response);
  };
  

  useEffect(() => {
    if (!authContext.user && !authContext.isUserLoading) {
      router.push("/");
    }
  }, [authContext.user]);

  return (
    <>
      <Layout>
        <div className={profileStyles.heading}>
          <h1>User Profile</h1>
        </div>
        <div className={profileStyles.container}>
          {authContext.user &&
            Object.keys(authContext.user).map((userKey) => {
              if (!userKey.includes("_id")) {
                if (userKey === "image") {
                  return <img src={`${authContext.user[userKey]}`} />;
                } else {
                  return (
                    <div key={userKey.id}>
                      {`${userKey}: ${authContext.user[userKey]}`}
                    </div>
                  );
                }
              }
            })}
            <input
              type="date"
              onChange={(e) => handleInputChange(e, "birthday")}
            />
            <button onClick={handleSaveClicked}>Save</button>
        </div>
      </Layout>
    </>
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
    return { props: {} };
  } catch (e) {
    console.error("error");
    return;
  }
}
