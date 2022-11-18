import React, { useEffect, useState } from "react";
import Layout from "../../components/layout";
import { useAuthContext } from "../../context/authContext";
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "../../pages/api/auth/[...nextauth]";
import profileStyles from "../../styles/profile.module.css";
import { updateUserProfile } from "../../lib/mongo/users";
import { router } from "next/router";

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
    }
    setLoadingEdit(false);
    console.log(authContext.user.details);
  };

  return (
    <>
      <Layout>
        <div className={profileStyles.heading}>
          <span className={profileStyles.span}>
            {" "}
            <h1>Welcome Back</h1>
            {authContext.user &&
              Object.keys(authContext.user).map((userKey) => {
                if (!userKey.includes("_id")) {
                  if (userKey === "name") {
                    return (
                      <h1 key={userKey._id} className={profileStyles.name}>
                        {`${authContext.user[userKey]}`}
                      </h1>
                    );
                  }
                }
              })}
          </span>
        </div>
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col col-lg-6 mb-4 mb-lg-0">
              <div className="card mb-3">
                <div className="row g-0">
                  <div className="col-md-4 gradient-custom text-center text-white">
                    {authContext.user &&
                      Object.keys(authContext.user).map((userKey) => {
                        if (!userKey.includes("_id")) {
                          if (userKey === "image") {
                            return (
                              <img
                                key={userKey._id}
                                alt="Avatar"
                                className="img-fluid my-5"
                                src={`${authContext.user[userKey]}`}
                              />
                            );
                          }
                        }
                      })}

                    {authContext.user &&
                      Object.keys(authContext.user).map((userKey) => {
                        if (!userKey.includes("_id")) {
                          if (userKey === "role") {
                            return (
                              <h4 key={userKey._id}>
                                {`${userKey}: ${authContext.user[userKey]}`}
                              </h4>
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
                    <button
                      className={profileStyles.btn}
                      onClick={handleSaveClicked}>
                      Save
                    </button>
                  </div>
                  <div className="col-md-8">
                    <div className="card-body p-4">
                      <h6>Profile Information</h6>
                      <hr className="mt-0 mb-4" />
                      <div className="row pt-1">
                        <div className="col-6 mb-3">
                          <h6>Name</h6>

                          {authContext.user &&
                            Object.keys(authContext.user).map((userKey) => {
                              if (!userKey.includes("_id")) {
                                if (userKey === "name") {
                                  return (
                                    <p className="text-mute" key={userKey._id}>
                                      {`${authContext.user[userKey]}`}
                                    </p>
                                  );
                                }
                              }
                            })}
                        </div>
                        <div className="col-6 mb-3">
                          <h6>Email</h6>
                          {authContext.user &&
                            Object.keys(authContext.user).map((userKey) => {
                              if (!userKey.includes("_id")) {
                                if (userKey === "email") {
                                  return (
                                    <p className="text-mute" key={userKey._id}>
                                      {`${authContext.user[userKey]}`}
                                    </p>
                                  );
                                }
                              }
                            })}
                        </div>
                        <h6>Login In Details</h6>
                        <div className="col-6 mb-3">
                          <h6>Profile Created</h6>
                          {authContext.user &&
                            Object.keys(authContext.user).map((userKey) => {
                              if (!userKey.includes("_id")) {
                                if (userKey === "date_created") {
                                  return (
                                    <p className="text-mute" key={userKey._id}>
                                      {`${authContext.user[userKey]}`}
                                    </p>
                                  );
                                }
                              }
                            })}
                        </div>
                        <div className="col-6 mb-3">
                          <h6>Date Created</h6>
                          {authContext.user &&
                            Object.keys(authContext.user).map((userKey) => {
                              if (!userKey.includes("_id")) {
                                if (userKey === "last_login") {
                                  return (
                                    <p className="text-mute" key={userKey.id}>
                                      {`${authContext.user[userKey]}`}
                                    </p>
                                  );
                                }
                              }
                            })}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
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
    console.error("uh oh");
    return;
  }
}
