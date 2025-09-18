import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export const PersonalArea=() =>{
 
 const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    anotherPhone: "",
    password: ""
  });

  const id = localStorage.getItem("_id");
  const token = localStorage.getItem("token");

  // שליפת הנתונים מהשרת לפי :id
  useEffect(() => {
    if (!id) {
      alert("משתמש לא מחובר");
      return;
    }

    axios.get(`http://localhost:3001/advertiser/getById/${id}`)
      .then((res) => {
        console.log("user data from server:", res.data);
        const data = res.data;
        setUser({
          name: data.name || "",
          email: data.email || "",
          phone: data.phone || "",
          anotherPhone: data.anotherPhone || "",
          password: "" // לא שולפים סיסמה קיימת
        });
      })
      .catch(() => {
        alert("שגיאה בטעינת נתוני המשתמש");
      });
  }, [id]);

  const change = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const save = (e) => {
    e.preventDefault();
    axios.post(`http://localhost:3001/advertiser/update/${id}`, user, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    
    .then(() => {
      
      alert("הפרטים עודכנו בהצלחה!");
      localStorage.setItem("token", token);
      localStorage.setItem("name",user.name);
    })

    .catch(() => {
      alert("שגיאה בעדכון הפרטים");
    });
  };

  return (
    <div style={{ direction: "rtl", padding: "20px" }}>
      <h2>אזור אישי</h2>

      <div style={{ marginBottom: "20px" }}>
        <Link to="/add-apartment">
          <button className="filter-btn">להוספת דירה</button>
        </Link>
      </div>
    <p>עדכון פרטים אישיים</p>
      <form onSubmit={save}  style={{ maxWidth: "600px", margin: "auto", display: "flex", flexDirection: "column", gap: "10px" }}>
        <input
        className="filter-btn"
          type="text"
          name="name"
          placeholder="שם"
          value={user.name}
          onChange={change}
          required
        />
        <input
        className="filter-btn"
          type="email"
          name="email"
          placeholder="אימייל"
          value={user.email}
          onChange={change}
          required
        />
        <input
        className="filter-btn"
          type="password"
          name="password"
          placeholder="סיסמה חדשה (אם רוצים לשנות)"
          value={user.password}
          onChange={change}
        />
        <input
        className="filter-btn"
          type="text"
          name="phone"
          placeholder="טלפון"
          value={user.phone}
          onChange={change}
        />
        <input
        className="filter-btn"
          type="text"
          name="anotherPhone"
          placeholder="טלפון נוסף"
          value={user.anotherPhone}
          onChange={change}
        />
        <button className="filter-btn" type="submit">עדכן פרטים</button>
      </form>
    </div>
  );

    
}
