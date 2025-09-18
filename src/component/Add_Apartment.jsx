import { useEffect, useState } from "react";
import { getAllcategory, addCategory } from "../api/category";
import { getAllc, addCity } from "../api/city";
import { add } from "../api/apartments";
import { useSelector } from "react-redux";

export const Add_Apartment = () => {
  const [cities, setCities] = useState([]);
  const [categories, setCategories] = useState([]);
  const currentUser = useSelector((state) => state.user?.CurrentUser || null);
  const [formData, setFormData] = useState({
    apartmentName: "",
    description: "",
    src: "",
    categoryCode: "",
    cityCode: "",
    address: "",
    numofbeds: "",
    Extras: "",
    price: "",
    asvertiserCode: localStorage.getItem("_id"),
  });
  const [newCategory, setNewCategory] = useState("");
  const [newCity, setNewCity] = useState("");
  const [showNewCategoryInput, setShowNewCategoryInput] = useState(false);
  const [showNewCityInput, setShowNewCityInput] = useState(false);

  const token = localStorage.getItem("token");

  useEffect(() => {
    getAllc()
      .then((res) => setCities(res.data))
      .catch(console.error);
    getAllcategory()
      .then((res) => setCategories(res.data))
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (currentUser?._id) {
      setFormData((prev) => ({
        ...prev,
        asvertiserCode: currentUser._id,
      }));
    }
  }, [currentUser]);

  const change = (e) => {
    const { name, value } = e.target;

    if (name === "categoryCode") {
      setShowNewCategoryInput(value === "other");
      if (value !== "other") setNewCategory("");
    }
    if (name === "cityCode") {
      setShowNewCityInput(value === "other");
      if (value !== "other") setNewCity("");
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const save = async (e) => {
    e.preventDefault();

    if (!token) {
      alert("את לא מחוברת!");
      return;
    }

    try {
      if (showNewCityInput && newCity.trim()) {
        const cityRes = await addCity({ cityName: newCity.trim() });
        const newCityId = cityRes.data._id;
        setFormData((prev) => ({ ...prev, cityCode: newCityId }));
        formData.cityCode = newCityId;
      }

      if (showNewCategoryInput && newCategory.trim()) {
        const catRes = await addCategory({ categoryName: newCategory.trim() });
        const newCatId = catRes.data._id;
        setFormData((prev) => ({ ...prev, categoryCode: newCatId }));
        formData.categoryCode = newCatId;
      }

      await add(formData);
      alert("הדירה נוספה בהצלחה 🏠");

      setFormData({
        apartmentName: "",
        description: "",
        src: "",
        categoryCode: "",
        cityCode: "",
        address: "",
        numofbeds: "",
        Extras: "",
        price: "",
        asvertiserCode: currentUser?._id || localStorage.getItem("_id"),
      });
      setNewCity("");
      setNewCategory("");
      setShowNewCityInput(false);
      setShowNewCategoryInput(false);

      const citiesRes = await getAllc();
      setCities(citiesRes.data);
      const categoriesRes = await getAllcategory();
      setCategories(categoriesRes.data);

    } catch (error) {
      console.error(error);
      alert("שגיאה בהוספת הדירה או העיר/קטגוריה");
    }
  };

  if (!token) {
    return <h2>את לא מחוברת, אנא התחברי כדי להוסיף דירה</h2>;
  }

  return (
    <div className="app-wrapper">
      {currentUser?.name && (
        <h5 style={{ textAlign: "center", color: "darkblue" }}>
          שלום {currentUser.name} 👋
        </h5>
      )}
     <p>-הוספת דירה-</p>
      <form onSubmit={save}>
        <input
        className="filter-btn"
          placeholder="שם הדירה"
          type="text"
          name="apartmentName"
          value={formData.apartmentName}
          onChange={change}
          required
        />
        <br />
        <label>תיאור:</label>
        <br />
        <textarea
          name="description"
          value={formData.description}
          onChange={change}
          className="filter-btn"
          required
        />
        <br />
        <label>קישור תמונה:</label>
        <input
          type="text"
          name="src"
          className="filter-btn"
          value={formData.src}
          onChange={change}
        />
        <br />
        <label>קטגוריה:</label>
        <select
          name="categoryCode"
          className="filter-btn"
          value={formData.categoryCode}
          onChange={change}
          required={!showNewCategoryInput}
        >
          <option value="">בחר קטגוריה</option>
          
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id} className="filter-btn">
              {cat.categoryName}
            </option>
          ))}
          <option value="other">אחר</option>
        </select>
        {showNewCategoryInput && (
          <>
            <label>קטגוריה חדשה:</label>
            <input
            className="filter-btn"
              type="text"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              required={showNewCategoryInput}
            />
            <br />
          </>
        )}
  <br></br>
        <label>עיר:</label>
        <select
        className="filter-btn"
          name="cityCode"
          value={formData.cityCode}
          onChange={change}
          required={!showNewCityInput}
        >
          <option value="">בחר עיר</option>
          {cities.map((city) => (
            <option key={city._id} value={city._id}>
              {city.cityName}
            </option>
          ))}
          <option value="other">אחר</option>
        </select>
        {showNewCityInput && (
          <>
            <label>עיר חדשה:</label>
            <input
              type="text"
              value={newCity}
              onChange={(e) => setNewCity(e.target.value)}
              required={showNewCityInput}
            />
            <br />
          </>
        )}
         <br></br>
        <label>כתובת:</label>
        <input
        className="filter-btn"
          type="text"
          name="address"
          value={formData.address}
          onChange={change}
          required
        />
        <br></br>
        <br />
        <label>מספר מיטות:</label>
        <input
        className="filter-btn"
          type="number"
          name="numofbeds"
          value={formData.numofbeds}
          onChange={change}
          required
        />
        <br />
        <label>תוספות:</label>
        <input
        className="filter-btn"
          type="text"
          name="Extras"
          value={formData.Extras}
          onChange={change}
        />
        <br />
        <label>מחיר:</label>
        <input
        className="filter-btn"
          type="number"
          name="price"
          value={formData.price}
          onChange
          ={change}
          required
        />
        <br />
        <button className="filter-btn" type="submit">שמור דירה</button>
      </form>
    </div>
  );
};