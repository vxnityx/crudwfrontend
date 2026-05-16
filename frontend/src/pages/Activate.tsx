import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { activateUser } from "../auth";
import "./Activate.css";

type ActivationState = "loading" | "success" | "error";

const Activate = () => {
  const navigate = useNavigate();
  const { uid = "", token = "" } = useParams();
  const [state, setState] = useState<ActivationState>("loading");
  const [message, setMessage] = useState("Activating your account...");

  useEffect(() => {
    let isMounted = true;

    const runActivation = async () => {
      if (!uid || !token) {
        if (isMounted) {
          setState("error");
          setMessage("This activation link is incomplete.");
        }
        return;
      }

      try {
        await activateUser(uid, token);

        if (isMounted) {
          setState("success");
          setMessage("Your account is active. Redirecting to login...");

          window.setTimeout(() => {
            navigate("/login", { replace: true });
          }, 1800);
        }
      } catch {
        if (isMounted) {
          setState("error");
          setMessage("Activation failed. The link may be expired or already used.");
        }
      }
    };

    runActivation();

    return () => {
      isMounted = false;
    };
  }, [navigate, token, uid]);

  return (
    <main className="activation-page">
      <section className={`activation-card activation-card--${state}`}>
        <div className="activation-badge">Account Activation</div>
        <h1>Welcome back</h1>
        <p>{message}</p>

        <div className="activation-status">
          {state === "loading" && <span className="activation-spinner" aria-hidden="true" />}
          {state === "success" && <span className="activation-icon activation-icon--success">✓</span>}
          {state === "error" && <span className="activation-icon activation-icon--error">!</span>}
        </div>

        <div className="activation-actions">
          <Link className="activation-link" to="/login">
            Go to login
          </Link>
        </div>
      </section>
    </main>
  );
};

export default Activate;