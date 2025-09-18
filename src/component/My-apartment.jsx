import { useEffect, useState } from "react";
import { del, getByAdvertiserCode, updateApartment } from "../api/apartments";
import { getAllcategory } from "../api/category";
import { getAllc } from "../api/city";

export const MyApartment = () => {
  const id = localStorage.getItem("_id");
  const [myApartments, setMyApartments] = useState([]);
  const [categories, setCategories] = useState([]);
  const [cities, setCities] = useState([]);

  const [editMode, setEditMode] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    apartmentName: "",
    description: "",
    src: "",
    categoryCode: "",
    cityCode: "",
    address: "",
    numofbeds: 0,
    Extras: "",
    price: 0,
  });

  useEffect(() => {
    if (id) {
      getByAdvertiserCode(id)
        .then((res) => setMyApartments(res.data || []))
        .catch((err) => console.error("שגיאה בהחזרת הדירות:", err));
    }

    getAllcategory()
      .then((res) => setCategories(res.data))
      .catch((err) => console.error("שגיאה בטעינת קטגוריות:", err));

    getAllc()
      .then((res) => setCities(res.data))
      .catch((err) => console.error("שגיאה בטעינת ערים:", err));
  }, [id]);

  const startEditApartment = (apartment) => {
    setFormData({
      apartmentName: apartment.apartmentName || "",
      description: apartment.description || "",
      src: apartment.src || "",
      categoryCode: apartment.categoryCode?._id || apartment.categoryCode || "",
      cityCode: apartment.cityCode?._id || apartment.cityCode || "",
      address: apartment.address || "",
      numofbeds: apartment.numofbeds || 0,
      Extras: apartment.Extras || "",
      price: apartment.price || 0,
    });
    setEditingId(apartment._id);
    setEditMode(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const save = (e) => {
    e.preventDefault();
    if (!editingId) return;

    const updatedApartment = {
      ...formData,
      _id: editingId,
    };

    updateApartment(updatedApartment, editingId)
      .then(() => {
        alert("הדירה עודכנה בהצלחה!");
        setEditMode(false);
        setEditingId(null);
        return getByAdvertiserCode(id);
      })
      .then((res) => {
        setMyApartments(res.data || []);
      })
      .catch((err) => {
        console.error("שגיאה בעדכון הדירה:", err);
        alert("אירעה שגיאה בעדכון הדירה");
      });
  };


  const deleteApartment = (apartmentId) => {
    del(apartmentId)
      .then(() => {
        alert("הדירה נמחקה בהצלחה!");
        return getByAdvertiserCode(id);
      })
      .then((res) => setMyApartments(res.data || []))
      .catch((err) => {
        console.error("שגיאה במחיקת הדירה:", err);
        alert("אירעה שגיאה במחיקת הדירה");
      });
  };

  return (
    <div className="apartment-container">
      <h2 style={{ textAlign: "center" }}>רשימת דירות</h2>
   <br></br>
      {myApartments.map((apartment) => (
        <div
        className="apartment-card"
          key={apartment._id}
          style={{ border: "1px solid #ccc", margin: "1em", padding: "1em" }}
        >
          <h5>שם הדירה: {apartment.apartmentName}</h5>
                      <img src={`http://localhost:3001/images/${apartment.src}`} alt="דירה" />

          <p>קטגוריה: {apartment.categoryCode?.categoryName || "לא ידוע"}</p>
          <p>מספר מיטות: {apartment.numofbeds}</p>
          <p>תוספות: {apartment.Extras}</p>
          <p>מחיר: ₪{apartment.price}</p>
          <p>עיר: {apartment.cityCode?.cityName || "לא ידוע"}</p>
          <p>
            פרטי מפרסם: {apartment.asvertiserCode?.name} |{" "}
            {apartment.asvertiserCode?.phone} | {apartment.asvertiserCode?.email}
          </p>
          
          <button className="filter-btn"  onClick={() => deleteApartment(apartment._id)}>מחק דירה</button>
          <button  className="filter-btn"  onClick={() => startEditApartment(apartment)}>ערוך דירה</button>

          {editMode && editingId === apartment._id && (
            <form
              style={{ direction: "rtl", maxWidth: 600, margin: "auto", marginTop: "1em" }}
              onSubmit={save}
            >
              <label>שם הדירה:</label>
              <input
                type="text"
                name="apartmentName"
                value={formData.apartmentName}
                onChange={handleChange}
                required
              />
              <br />

              <label>תיאור:</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
              />
              <br />

              <label>קישור תמונה:</label>
              <input
                type="text"
                name="src"
                value={formData.src}
                onChange={handleChange}
              />
              <br />

              <label>קטגוריה:</label>
              <select
                name="categoryCode"
                value={formData.categoryCode}
                onChange={handleChange}
                required
              >
                <option value="">בחר קטגוריה</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.categoryName}
                  </option>
                ))}
              </select>
              <br />

              <label>עיר:</label>
              <select
                name="cityCode"
                value={formData.cityCode}
                onChange={handleChange}
                required
              >
                <option value="">בחר עיר</option>
                {cities.map((city) => (
                  <option key={city._id} value={city._id}>
                    {city.cityName}
                  </option>
                ))}
              </select>
              <br />

              <label>כתובת:</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
              />
              <br />

              <label>מספר מיטות:</label>
              <input
                type="number"
                name="numofbeds"
                value={formData.numofbeds}
                onChange={handleChange}
                required
                min={0}
              />
              <br />

              <label>תוספות:</label>
              <input
                type="text"
                name="Extras"
                value={formData.Extras}
                onChange={handleChange}
              />
              <br />

              <label>מחיר:</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                min={0}
              />
              <br />

              <button type="submit">שמור שינויים</button>
            </form>
          )}
        </div>
      ))}
    </div>
  );
};
