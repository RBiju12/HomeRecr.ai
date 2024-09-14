import {useEffect, useState} from "react";
import {withAuthInfo} from "@propelauth/react";
import Loading from "./loading";

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
        return {status: response.status};
    }
}

export default withAuthInfo(function Auth({accessToken}) {
    const [response, setResponse] = useState<any>(null);

    useEffect(() => {
        fetchFromApi(accessToken).then((data) => setResponse(data));
    }, [])

    if (response) {
        return <h1>{JSON.stringify(response, null, 2)}</h1>
    } else {
        return <Loading />
    }
})
