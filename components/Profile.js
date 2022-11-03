import { useRouter } from "next/router";



const Profile = (props) => {
    const { user } = props;
    const router = useRouter();

    useEffect(() => {
      if (!authContext.user && !authContext.isUserLoading) {
        router.push("/");
      }
    }, [authContext.user]);
    

  
    return (
      <div>
        {Object.keys(user).map((userKey) => {
          if (!userKey.includes("_id")) {
            if (userKey === "image") {
              return <img src={`${user[userKey]}`} />;
            } else {
              return <div>{`${userKey}: ${user[userKey]}`}</div>;
            }
          }
        })}
      </div>
    );
  };
  
  export default Profile;
  