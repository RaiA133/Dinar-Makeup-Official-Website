import { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import { useSearchParams, useNavigate } from "react-router-dom";
import { verifyUserEmail } from "../modules/fetch";
import emailNotVerified from "../../../assets/img/email-verify/email-not-verified.gif"

const VerifyEmail = () => {
  const { userState, updateUser } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState([]);  // Corrected spelling
  const [error, setError] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const emailToken = searchParams.get("emailToken");

  useEffect(() => {
    (async () => {
      if (userState?.isVerified) {
        setTimeout(() => {
          return navigate("/login");
        }, 3000);
      } else {
        if (emailToken) {
          // post request
          setIsLoading(true);
          try {
            const response = await verifyUserEmail(emailToken);
            setIsLoading(false);
            if (response.status[1] === "Success") {
              updateUser(response.data);
              setResponse(response);
            }
          } catch (error) {
            setIsLoading(false);
            setError(error.message);
          }
        }
      }
    })();
  }, [emailToken, userState]);

  // console.log("userState", userState);
  // console.log("response", response);
  // console.log("response error", response.message);
  // console.log("error", error);

  return (
    <div>
      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : (
        <div>
          {userState?.isVerified ? (
            <div className="flex justify-center items-center h-screen">
              <div>
                <div className="card w-96 bg-base-100 shadow-xl">
                  <div className="card-body">
                    <h2 className="card-title">Email Verified!</h2>
                    <p>{response?.message}. redirecting...</p>
                  </div>
                  <figure><img src={`${import.meta.env.VITE_BACKEND_BASEURL}/email/email-verified.gif`} alt="Shoes" /></figure>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex justify-center h-screen items-center">
              <div>
                {error ? (
                  <div className="card w-96 bg-base-100 shadow-xl">
                    <div className="card-body">
                      <h2 className="card-title">Verifikasi gagal !</h2>
                      <p>{error}</p>
                    </div>
                    <figure><img src={`${import.meta.env.VITE_BACKEND_BASEURL}/email/email-not-verified.gif`} title={import.meta.env.VITE_BACKEND_BASE_URL} /></figure>
                  </div>
                ) : null}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default VerifyEmail;