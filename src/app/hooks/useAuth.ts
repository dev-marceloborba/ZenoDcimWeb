import { selectIsAuthenticated, logout, setCredentials } from "features/authentication/authenticationSlice";
import { useAppDispatch, useAppSelector } from "../hooks";

export const useAuth = () => {
    const signed = useAppSelector(selectIsAuthenticated)
    const dispatch = useAppDispatch()

    const signout = () => dispatch(logout())

    return {
        signed,
        signout,
        setCredentials
    }
}