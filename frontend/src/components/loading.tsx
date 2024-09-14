import { RotatingLines } from "react-loader-spinner"

export default function Loading()
{
    return (
        <>
            <RotatingLines
                strokeColor="black"
                strokeWidth="5"
                animationDuration="0.5"
                width="60"
                visible={true}
            />
        </>
    )
}