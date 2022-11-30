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
        <div className="overflow-hidden bg-white shadow sm:rounded-lg">
          <div className={profileStyles.firstDiv}>
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Welcome Back
              {authContext.user &&
                Object.keys(authContext.user).map((userKey) => {
                  if (!userKey.includes("_id")) {
                    if (userKey === "name") {
                      return (
                        <h3 key={userKey._id}>
                          {`${authContext.user[userKey]}`}
                        </h3>
                      );
                    }
                  }
                })}
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Personal details
            </p>
            {authContext.user &&
              Object.keys(authContext.user).map((userKey) => {
                if (!userKey.includes("_id")) {
                  if (userKey === "image") {
                    return (
                      <div className="mt-3 flex -space-x-2 overflow-hidde object-right inset-y-0 right-0 ">
                        <img
                          key={userKey._id}
                          alt="Avatar"
                          className="h-12 w-12 rounded-full ring-2 ring-white"
                          src={`${authContext.user[userKey]}`}
                        />
                      </div>
                    );
                  }
                }
              })}
          </div>
          <div className="border-t border-gray-200">
            <dl>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Full name</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                  {" "}
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
                </dd>
              </div>
              <div className="bg-white-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Email address
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                  {" "}
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
                </dd>
              </div>
              <div className="bg-white-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Birthday</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
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
                    </dd>
              </div>
              <div className="bg-white-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">User Role</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                  {" "}
                  {authContext.user &&
                    Object.keys(authContext.user).map((userKey) => {
                      if (!userKey.includes("_id")) {
                        if (userKey === "role") {
                          return (
                            <p className="text-mute" key={userKey._id}>
                              {`${authContext.user[userKey]}`}
                            </p>
                          );
                        }
                      }
                    })}
                </dd>
              </div>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Last Logged In On:
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                  {" "}
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
                </dd>
              </div>
              <div className="bg-white-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  You Created Your Profile On:
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
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
                </dd>
              </div>
            </dl>
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
