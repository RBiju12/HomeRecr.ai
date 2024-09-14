import Hamburger from "hamburger-react";
import Navbar from './navbar'
import { useState } from "react";

export default function Switch()
{
    const [isToggle, setisToggle] = useState<boolean>(false)
    return (
        <>
            <Hamburger toggled={isToggle} toggle={setisToggle} />

            {isToggle ? <Navbar /> : null}
        </>

        
    )
}