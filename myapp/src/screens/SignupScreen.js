import React, { useRef, useState } from "react";
import { auth } from "../firebase";
import "./SignupScreen.css";

function SignupScreen() {
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const [popupOpen, setPopupOpen] = useState(false);
    const [popupMessage, setPopupMessage] = useState('');

    const showErrorPopup = (message) => {
        setPopupOpen(true);
        setPopupMessage(message);
    };

    const closePopup = () => {
        setPopupOpen(false);
    };


    const register = (e) => {
        e.preventDefault();
        console.log(e);
        auth
            .createUserWithEmailAndPassword(
                emailRef.current.value,
                passwordRef.current.value
            )
            .then((authUser) => {
                console.log(authUser);
            })
            .catch((error) => {
                showErrorPopup(error.message);
            });
    };

    const signIn = (e) => {
        e.preventDefault();

        auth
            .signInWithEmailAndPassword(
                emailRef.current.value,
                passwordRef.current.value
            )
            .then((authUser) => {
                console.log(authUser);
            })
            .catch((error) => showErrorPopup(error.message));
    };
    return (
        <div className="signupScreen">
            <form>
                <h1>Sign In</h1>
                <input ref={emailRef} placeholder="Email" type="email" />
                <input ref={passwordRef} placeholder="Password" type="password" />
                <button type="submit" onClick={signIn}>
                    Sign In
                </button>

                <h4>
                    <span className="signupScreen__gray">New to MovieLand? </span>
                    <span className="signupScreen__link" onClick={register}>
                        Sign Up now.
                    </span>
                </h4>
            </form>
            {popupOpen && (
                <div
                    className="popup"
                    style={{
                        position: 'fixed',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        backgroundColor: 'black',
                        borderRadius: '8px',
                        padding: '24px',
                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                        maxWidth: '400px',
                    }}
                >
                    <div className="popup-content">
                        <p style={{ marginBottom: '16px',fontSize:"15px" }}>{popupMessage}</p>
                        <button
                            style={{
                                padding: '8px 16px',
                                backgroundColor: '#007bff',
                                color: '#ffffff',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer',
                            }}
                            onClick={closePopup}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default SignupScreen;