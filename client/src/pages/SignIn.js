import { useSelector } from "react-redux";
import Example from "../features/auth/components/signin";
import { selectLoggedInUser } from "../features/auth/authSlice";
import { Navigate } from "react-router-dom";

const SignIn = () => {
    const isUserLoggedIn = useSelector(selectLoggedInUser);
    return (
        <>
            {isUserLoggedIn && <Navigate to={'/products'} replace={true} />}
            <Example />
        </>
    )
}

export default SignIn;