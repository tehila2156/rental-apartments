import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { City } from './component/City.jsx';
import { Category } from './component/Category.jsx';
import { All_Apartments } from './component/All_Apartments.jsx';
import { Advertiser_log_in } from './component/Advertiser_log_in.jsx';
import { Add_Apartment } from './component/Add_Apartment.jsx';
import { Advertiser_sign_up } from './component/Advertiser_sign_up.jsx';
import NavBar from './component/NavBar.jsx';
import { MyApartment } from './component/My-apartment.jsx';
import { MoreDetails } from './component/MoreDetails.jsx';
import { Home } from './component/Home.jsx';
import { PersonalArea } from './component/PersonalArea.jsx';

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
      <Route path="/personalarea" element={<PersonalArea/>} />

        <Route path="/" element={<Home/>} />
        <Route path="/signup" element={<Advertiser_sign_up />} />
        <Route path="/my-apartment" element={<MyApartment/>} />
        <Route path="/login" element={<Advertiser_log_in />} />
        <Route path="/add-apartment" element={<Add_Apartment />} />
        <Route path="/all-apartments" element={<All_Apartments />} />
        <Route path="/city" element={<City />} />
        <Route path="/category" element={<Category />} />
        <Route path="/details/:id" element={<MoreDetails/>} />

      </Routes>
    </BrowserRouter>
  );
}


export default App;
