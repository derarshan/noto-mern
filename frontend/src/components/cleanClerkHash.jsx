import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";

const useForceReloadOnClerkSSO = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.hash.startsWith("#/sso-callback")) {
      navigate(location.pathname + location.search, { replace: true });
    }
  }, [location, navigate]);
};

export default useForceReloadOnClerkSSO