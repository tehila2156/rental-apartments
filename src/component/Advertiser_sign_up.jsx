import { useEffect, useState } from "react"
import {sign_up } from "../api/advertiser";



export const Advertiser_sign_up=()=>
{
      const change = (e) => {
        const { name, value } = e.target;
        setuser((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const save = (e) => {
    e.preventDefault(); // למנוע ריענון דף
    sign_up(user)
        .then((res) => {
            const token = res.data.token;
            if (token) {
                localStorage.setItem("token", token);
                 localStorage.setItem("_id",res.data.user._id);
                 localStorage.setItem("name",res.data.user.name);
                alert("you are sign-up welcome 🥳");
                 if (typeof window.updateNavLoginStatus === "function") {
                   window.updateNavLoginStatus();
  }
            } else {
                alert("No token received 😥");
            }
        })
        .catch(() => {
            alert("Problem connecting🥲");
        });
};
    const [user, setuser]=useState({
        email: "",
        password: "",
        name:"" 
        ,anotherPhone:""
        , phone:""
    }
    );

    return<>

<form       style={{ direction: "rtl", maxWidth: 600, margin: "auto" }}
     onSubmit={save}   >
         <input
         className="filter-btn"
                    placeholder="שם:"
                    type="text"
                    name="name"
                    value={user.name}
                    onChange={change}
                    required
                />
 <br></br>
      <input
      className="filter-btn"
                    placeholder="מייל:"
                    type="text"
                    name="email"
                    value={user.email}
                    onChange={change}
                    required
                />
               <br></br>

                  <input
                  className="filter-btn"
                    placeholder="ססמא:"
                    type="text"
                    name="password"
                    value={user.password}
                    onChange={change}
                    required
                />
               
                <br></br>
 <input
 className="filter-btn"
                    placeholder="מספר פלאפון:"
                    type="text"
                    name="phone"
                    value={user.phone}
                    onChange={change}
                    required
                />
                 <br></br>
 <input
 className="filter-btn"
                    placeholder="מספר נוסף:"
                    type="text"
                    name="anotherPhone"
                    value={user.anotherPhone}
                    onChange={change}
                    required
                />









               <br></br>
                  <button type="submit" className="filter-btn" style={{ marginTop: 10 }}>
                    הירשם:
                </button>

</form>

    </>
}
