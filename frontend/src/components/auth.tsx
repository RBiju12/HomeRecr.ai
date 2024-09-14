import { useEffect, useState } from "react";
import { withAuthInfo } from "@propelauth/react";
import Loading from "./loading";
import Navbar from './navbar';

const fetchFromApi = async (accessToken: string | null) => {
  const response = await fetch("http://localhost:8000/api/auth", {
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${accessToken}`
    }
  });
  if (response.ok) {
    return response.json();
  } else {
    throw new Error("Not Valid");
  }
};

export default withAuthInfo(function Auth({ accessToken }) {
  const [response, setResponse] = useState<any>(null);

  useEffect(() => {
    fetchFromApi(accessToken).then((data) => setResponse(data)).catch((err: any) => console.log(err));
  }, []);

  if (response) {
    const res: any = JSON.stringify(response);
    const obj: any = JSON.parse(res);
    const email = obj["Hello"];

    return <Navbar email={email} />;
  } else {
    return <Loading />;
  }
});
