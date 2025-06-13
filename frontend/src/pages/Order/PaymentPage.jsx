import { useContext, useEffect, useState } from "react";
import { ProductsContext } from "../../contexts/ProductsContext";
import toast, { Toaster } from "react-hot-toast";

function PaymentPage() {
  const [copied, setCopied] = useState(false);
  const {
    productsByIDState, setProductsByIDState
  } = useContext(ProductsContext);

  const paymentData = JSON.parse(sessionStorage.getItem('paymentData'));

  const targetDate = new Date(paymentData.expiry_time); // ISO format
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const diff = targetDate.getTime() - now.getTime();

      if (diff <= 0) {
        clearInterval(interval);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      if (paymentData.transaction_status === "pending") {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / (1000 * 60)) % 60);
        const seconds = Math.floor((diff / 1000) % 60);
        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }

    }, 1000);

    return () => clearInterval(interval); // clean up on unmount
  }, [paymentData.transaction_status, targetDate]);

  //END COUNTDOWN

  return (
    <div className="m-3 sm:m-5">
      <div className="my-3">

        <Toaster
          toastOptions={{
            style: {
              maxWidth: '600px'
            }
          }}
        />

        <div className="p-4">
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">Payment Details</h2>

              <div className="divider my-0"></div>

              {paymentData.transaction_status == "pending" ? (
                <div role="alert" className="alert alert-info">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="h-6 w-6 shrink-0 stroke-current">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <span>Waiting for payment.</span>
                </div>
              ) : (
                <div role="alert" className="alert alert-success">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Your purchase has been confirmed!</span>
                </div>
              )}

              <div className="divider my-0"></div>

              <ul className="steps steps-vertical sm:steps-horizontal">
                <li className="step step-primary">Payment</li>
                <li className="step">Confirmation</li>
                <li className="step">Preparation & Coordination</li>
                <li className="step">Weddings Day</li>
              </ul>

              <div className="divider my-0"></div>

              <div className="space-y-2">

                <div className="flex justify-center">
                  <div className="grid grid-cols-1 justify-center md:grid-cols-2 gap-2 w-fit">
                    <p style={{ cursor: 'pointer' }} className="flex justify-center items-center"
                      onClick={() => {
                        navigator.clipboard.writeText(paymentData.va).then(() => {
                          setCopied(true);
                          setTimeout(() => setCopied(false), 1500); // Reset after 1.5s
                          toast('Copied!', {
                            icon: '📋',
                          });
                        });
                      }}>
                      <span className="p-5 border border-base-300 shadow-sm rounded-box btn btn-soft btn-neutral">
                        <strong>VA Number:</strong> {paymentData.va} 📋
                      </span>
                    </p>

                    {/* Countdown */}
                    <div className="flex justify-center mt-2 md:mt-0">
                      <div className="grid grid-flow-col gap-5 text-center auto-cols-max">
                        <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content h-fit">
                          <span className="countdown font-mono text-4xl">
                            <span style={{ "--value": timeLeft.days } /* as React.CSSProperties */} aria-live="polite" aria-label={timeLeft.days}>{timeLeft.days}</span>
                          </span>
                          days
                        </div>
                        <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content h-fit">
                          <span className="countdown font-mono text-4xl">
                            <span style={{ "--value": timeLeft.hours } /* as React.CSSProperties */} aria-live="polite" aria-label={timeLeft.hours}>{timeLeft.hours}</span>
                          </span>
                          hours
                        </div>
                        <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content h-fit">
                          <span className="countdown font-mono text-4xl">
                            <span style={{ "--value": timeLeft.minutes } /* as React.CSSProperties */} aria-live="polite" aria-label={timeLeft.minutes}>{timeLeft.minutes}</span>
                          </span>
                          min
                        </div>
                        <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content h-fit">
                          <span className="countdown font-mono text-4xl">
                            <span style={{ "--value": timeLeft.seconds } /* as React.CSSProperties */} aria-live="polite" aria-label={timeLeft.seconds}>{timeLeft.seconds}</span>
                          </span>
                          sec
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="divider my-0"></div>

                <div className="flex justify-center mt-4">
                  <div className="border border-base-300 p-5 shadow-md rounded-box w-full max-w-2xl">
                    <p><strong>Order ID:</strong> {paymentData.order_id}</p>
                    <p><strong>Amount: </strong>
                      {new Intl.NumberFormat('id-ID', {
                        style: 'currency',
                        currency: paymentData?.currency || 'IDR',
                        minimumFractionDigits: 0
                      }).format(paymentData?.gross_amount || 0)}
                    </p>
                    <p><strong>Bank:</strong> {paymentData.bank_name.toUpperCase()}</p>
                    <p><strong>Trasaction Time:</strong> {paymentData.transaction_time}</p>
                    <p><strong>Pay Before:</strong> {paymentData.expiry_time}</p>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default PaymentPage;