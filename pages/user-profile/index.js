import React, { useEffect, useState } from "react";
import Layout from "../../components/layout";
import { useAuthContext } from "../../context/authContext";
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "../../pages/api/auth/[...nextauth]";
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
        <section class="font-sans antialiased text-gray-900 leading-normal tracking-wider bg-cover">
            <div
            className="border border-inherit pt-8 m-20 rounded-lg lg:rounded-l-lg shadow-2xl "
              id="profile"
           >
         
              {" "}
              <div class="p-4 md:p-12 text-center lg:text-left">
              {authContext.user &&
                Object.keys(authContext.user).map((userKey) => {
                  if (!userKey.includes("_id")) {
                    if (userKey === "image") {
                      return <img className="block absolute rounded-full shadow-xl mx-auto mb-8 -mt-36 h-48 w-48 bg-cover bg-center sm: rounded-full shadow-xl mx-auto -mt-16 h-48 w-48 bg-cover bg-center" alt="profile picture" src={`${authContext.user[userKey]}`}></img>
                    }
                  }
                })}
                <h1 class="text-3xl font-bold pt-8 lg:pt-0 capitalize">
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
                </h1>
                <div class="mx-auto lg:mx-0 w-4/5 pt-3 border-b-2 border-purple-500 opacity-25"></div>
                <div className="bg-white-50 lg:text-center px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
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
                <div class="mx-auto lg:mx-0 w-4/5 pt-3 border-b-2 border-purple-500 opacity-25"></div>
                <div className="bg-white-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    User Role
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0 capitalize">
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
                <div class="mx-auto lg:mx-0 w-4/5 pt-3 border-b-2 border-purple-500 opacity-25"></div>
                <div className="bg-white-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
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
                <div class="mx-auto lg:mx-0 w-4/5 pt-3 border-b-2 border-purple-500 opacity-25"></div>
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
                <div class="mx-auto lg:mx-0 w-4/5 pt-3 border-b-2 border-purple-500 opacity-25"></div>
                <div class="bg-white-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    {" "}
                    Enter Your Birthday
                  </dt>
                  <dd className="mt-1 mb-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
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
                      onClick={handleSaveClicked}
                      class="bg-purple-500 hover:bg-purple-900 text-white font-bold py-2 px-4 rounded-full">
                      Save
                    </button>
                  </dd>
                </div>
              </div>
            </div>
        
        </section>
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

{
  /* <div className="overflow-hidden m-16 bg-white shadow sm:rounded-lg">
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
                <dt className="text-sm font-medium text-gray-500">Enter Your Birthday</dt>
     
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
        </div> */
}
