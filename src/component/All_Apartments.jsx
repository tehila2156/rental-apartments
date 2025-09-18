import { useEffect, useState } from "react";
import {
  getAll,
  lessthen500shac,
  lesthen5beds,
  Morethen1500sh1,
  Morethen500sh,
  morethen500shac,
  Morethen5beds,
} from "../api/apartments.js";
import { useDispatch, useSelector } from "react-redux";
import { setApartments } from "../redux/ApartmentsAction.js";
import { useNavigate } from "react-router-dom";

export const All_Apartments = () => {
  const dispatch = useDispatch();
  const apartments = useSelector((state) => state.Apartments.list);
  const [tempapartment, settempapartment] = useState([apartments]);
  const [isFiltered, setIsFiltered] = useState(false);
  const [islogin, setislogin] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) setislogin(true);

    getAll()
      .then((res) => {
        dispatch(setApartments(res.data));
      })
      .catch((err) => {
        console.error("שגיאה בקבלת הדירות:", err);
      });
  }, [dispatch]);

  const handleFilter = (filterFn) => {
    filterFn().then((res) => {
      settempapartment(res.data);
      setIsFiltered(true);
    });
  };

  return (
    <div className="page-wrapper">
     

      {islogin && (
        <div className="filters">
           <h5 className="title">סינוני דירות</h5>
          <button className="filter-btn" onClick={() => handleFilter(lesthen5beds)}>פחות מ-5 מיטות</button>
          <button className="filter-btn" onClick={() => handleFilter(Morethen5beds)}>יותר מ-5 מיטות</button>
          <button className="filter-btn" onClick={() => handleFilter(lessthen500shac)}>פחות מ-500 ש"ח ללילה</button>
          <button className="filter-btn" onClick={() => handleFilter(Morethen500sh)}>יותר מ-500 ש"ח ללילה</button>
          <button className="filter-btn" onClick={() => handleFilter(Morethen1500sh1)}>יותר מ-1500 ש"ח ללילה</button>
        </div>
      )}

      {isFiltered && (
        <button className="filter-btn" onClick={() => setIsFiltered(false)}>הצג הכול</button>
      )}

      <div className="apartment-container">
        {(isFiltered ? tempapartment : apartments).map((apartment) => (
          <div className="apartment-card" key={apartment._id}  style={{
    border: '3px solid',
    borderColor:
      apartment.price <= 100 ? 'green' :
      apartment.price <= 500 ? 'yellow' :
      'red',
  }}>
            <h5>{apartment.apartmentName}</h5>
            <img src={`http://localhost:3001/images/${apartment.src}`} alt="דירה" />
            <p>מחיר: ₪{apartment.price}</p>
            <p>עיר: {apartment.cityCode?.cityName || apartment.cityCode || "לא ידוע"}</p>
         
            <button className="show-details-btn" onClick={() => navigate(`/details/${apartment._id}`)}>
              הצג פרטי דירה
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
