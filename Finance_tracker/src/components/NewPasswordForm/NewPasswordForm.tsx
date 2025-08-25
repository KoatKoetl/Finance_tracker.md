import { useEffect } from "react";

const NewPasswordForm = () => {
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const params = new URLSearchParams(hash.substring(1));
      const accessToken = params.get("access_token");

      if (accessToken) {
        console.log("Access Token:", accessToken);
      } else {
        console.log("Access token not found in URL hash.");
      }
    }
  }, []);

  return (
    <div>
      <h1>Checking for Access Token...</h1>
      <p>Please open your browser's developer console to see the result.</p>
    </div>
  );
};

export default NewPasswordForm;
