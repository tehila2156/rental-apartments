import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sign_in } from "../api/advertiser";
import { setUser } from "../redux/UserAction";
import { useNavigate } from "react-router-dom";


export const Advertiser_log_in = () => {
  const dispatch = useDispatch();
  const currentuser = useSelector((state) => state.User.currentuser); // נשלף מתוך ה-Redux
  const [searchuser, setsearchuser] = useState({
    email: "",
    password: ""
  });
  

  const navigate = useNavigate()



  const change = (e) => {
    const { name, value } = e.target;
    setsearchuser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const save = (e) => {
    e.preventDefault();
    sign_in(searchuser)
      .then((res) => {
        const token = res.data.token;
        const userData = res.data.user 

        if (token) {
          localStorage.setItem("token", token);
          localStorage.setItem("name", userData.name);
          localStorage.setItem("_id",userData._id)


          dispatch(setUser(userData.name)); // שומר ב־Redux
          alert("you are log-in 😜");

          if (typeof window.updateNavLoginStatus === "function") {
            window.updateNavLoginStatus();
          }
        } else {
          alert("No token received 😥");
        }
      })
      .catch(() => {
        alert("mail or password is not correct 🥲");
        navigate(`/signup`)
      });
  };

  return (
    
    <form style={{ direction: "rtl", maxWidth: 600, margin: "auto" }} onSubmit={save}>
        
        
      <input
        placeholder="מייל:"
        type="text"
        className="filter-btn"
        name="email"
        value={searchuser.email}
        onChange={change}
        required
      />
      <br />
      <input
      className="filter-btn"
        placeholder="ססמא:"
        type="password"
        name="password"
        value={searchuser.password}
        onChange={change}
        required
      />
      
      <br />
      <button type="submit"  className="filter-btn" style={{ marginTop: 10 }}>
        התחבר
      </button>
      <h1>{currentuser}</h1>
    </form>
  );
};
