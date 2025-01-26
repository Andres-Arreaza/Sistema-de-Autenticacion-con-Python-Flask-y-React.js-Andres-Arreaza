import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/single.css";

export const Single = props => {
    const { store, actions } = useContext(Context);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const sign_up = async (e) => {
        e.preventDefault();
        let register = await actions.sign_up(email, password);
        if (register) {
            let rsp = await actions.getLogin(email, password);
            if (rsp) {
                navigate("/demo");
            }
        }
    };
    return (
        <div className="container text-center mt-5">
            <div className="row">
                <div className="d-flex justify-content-center">
                    <div className="col-sm-5 form-container">
                        <h2 className="form-title">Sign Up</h2>
                        <form>
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                                <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="form-control" id="exampleInputPassword1" />
                            </div>
                            <button type="button" onClick={(e) => sign_up(e)} className="btn btn-primary">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

Single.propTypes = {
    match: PropTypes.object
};
