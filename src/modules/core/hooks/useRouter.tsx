import { useNavigate, useLocation, useParams } from "react-router-dom";
import type { NavigateOptions } from "react-router-dom";

const useRouter = () => {
  const params = useParams();
  const { pathname, state: navigationState } = useLocation();
  const router = useNavigate();

  const getDataFromStorage = () => {
    const data = localStorage.getItem("data");
    if (data) {
      return JSON.parse(data);
    }
    return null;
  };

  const state = navigationState?.data
    ? navigationState
    : getDataFromStorage() || {};

  const navigate = (to: string, options: NavigateOptions) => {
    const { state } = options;
    localStorage.setItem("state", JSON.stringify(state));
    router(to, { state });
  };

  return {
    navigate,
    path: pathname,
    state,
    params,
  };
};

export default useRouter;