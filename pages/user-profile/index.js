import React, { useEffect, useState } from "react";
import Layout from "../../components/layout";
import { useAuthContext } from "../../context/authContext";
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "../../pages/api/auth/[...nextauth]";
import profileStyles from "../../styles/profile.module.css";
import { updateUserProfile } from "../../lib/mongo/users";
import Loader from "../../components/utility/Loader";

export default function MyProfile() {
  const authContext = useAuthContext();
  const [formData, setFormData] = useState();
  const [loadingEdit, setLoadingEdit] = useState(false);

  const handleInputChange = (e, inputKey) => {
    setFormData({ ...formData, [inputKey]: e.target.value });
  };

  useEffect(() => {
    if (!authContext.user && !authContext.isUserLoading) {
      router.push("/");
    }

    if (authContext.user) {
      setFormData(authContext.user.details);
    }
  }, [authContext.user]);

  const handleSaveClicked = async () => {
    setLoadingEdit(true);
    const updatedDate = new Date();
    const response = await updateUserProfile({
      ...formData,
      user_id: authContext.user._id,
      date_updated: updatedDate,
    });
    if (response.message) {
      authContext.setUser({
        ...authContext.user,
        details: {
          ...authContext.user.details,
          ...formData,
          date_updated: updatedDate,
        },
      });
      setLoadingEdit(false);
      authContext.user.details
    }
  };

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
                } else if (userKey !== "details") {
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
            value={
              formData && formData.birthday
                ? formData.birthday
                : new Date().toJSON().split("T")[0]
            }
          />

          {!loadingEdit && <button onClick={handleSaveClicked}>Save</button>}
          {loadingEdit && <Loader />}
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
