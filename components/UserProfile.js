import { updateUserProfile } from "../lib/mongo/users";
import React, { useEffect, useState } from "react";
import Loader from "./utility/Loader";
import userProfileStyles from "../styles/profile.module.css";

const UserProfile = (props) => {
  const { user, component } = props;
  const rolesArray = ["admin", "guest", "subscriber"];
  const [loadingEdit, setLoadingEdit] = useState(false);

  const handleRoleChanged = async (e) => {
    setLoadingEdit(true);
    const updatedDate = new Date();
    const response = await updateUserProfile({
      user_id: user._id,
      role: e.target.value,
      date_updated: updatedDate,
    });
    if (response.message) {
      setAllUsers((prevState) => {
        const index = prevState.findIndex((item) => item._id === user._id);
        const newArr = [...prevState];
        newArr[index].role = e.target.value;
        newArr[index].date_updated = updatedDate;
        return newArr;
      });
      setTimeout(() => {
        setLoadingEdit(false);
      }, 1000);
      
    }
  };

  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    
       <div className={userProfileStyles.userWrapper}>
    <img src={`${user["image"]}`} className={userProfileStyles.userImage} />
    <div className={userProfileStyles.userText}>{`${user["name"]}`}</div>
    <div className={userProfileStyles.userText}>{` ${user["email"]}`}</div>
    {component === "admin" && (
      <>
        {!loadingEdit && (
          <select
            name="role"
            id="role"
            className={userProfileStyles.userInput}
            onChange={handleRoleChanged}
          >
            {rolesArray.map((roleName) => (
              <option
                selected={user["role"] === roleName ? true : false}
                value={roleName}
              >
                {roleName}
              </option>
            ))}
          </select>
        )}
        <div className={userProfileStyles.userText}>Last Login</div>
        <div className={userProfileStyles.userText}>{` ${
          user["last_login"].split("T")[0]
        } @ ${user["last_login"].split("T")[1].split(".")[0]}`}</div>
        {loadingEdit && <Loader />}
      </>
    )}
    {component === "profile" && (
      <>
        <div className={userProfileStyles.userText}>{user["role"]}</div>
        <span className={userProfileStyles.userText}>Birthday </span>
        <input
          type="date"
          className={userProfileStyles.userInput}
          onChange={(e) => handleInputChange(e, "birthday")}
          value={
            formData && formData.birthday
              ? formData.birthday
              : new Date().toJSON().split("T")[0]
          }
        />
        <button onClick={handleSaveClicked}>Save</button>
      </>
    )}
  </div>
  );
};

export default UserProfile;
