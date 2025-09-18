import { Link, useNavigate } from "react-router-dom";

export const Home = () => {
  const images = [1,2,3,4,5,6,7,8,9,10];
    const navigate = useNavigate()

  return (
    <div className="home-container">

        <Link to="/signup" >אין לך חשבון?</Link>
      <p className="home-title">   הנופש הבא שלך מתחיל כאן – מגוון דירות בוטיק, נוף, בריכה ומשפחה   </p>
      <div className="image-collage">
        {images.map((img, index) => (
          <img
            key={index}
            src={`http://localhost:3001/images/${img}.jpg`}
            alt={`תמונה ${index + 1}`}
            className="collage-img"
          />
        ))}
      </div>
    </div>
  );
};