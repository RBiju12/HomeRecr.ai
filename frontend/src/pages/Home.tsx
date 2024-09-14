import {withAuthInfo} from "@propelauth/react";

export default withAuthInfo(function Home({isLoggedIn, user}) {
    if (isLoggedIn) {
        return <div className="text-center">Welcome {user?.email}</div>
    } else {
        return <div>Not logged in</div>
    }
})