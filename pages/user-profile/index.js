import Layout from "../../components/layout";
import { useAuthContext } from "../../context/authContext";

export default function MyProfile() {
  const authContext = useAuthContext();

  return (
    <Layout>
      {authContext.user && <div>{console.log(authContext.user)}</div>}
    </Layout>
  );
}
