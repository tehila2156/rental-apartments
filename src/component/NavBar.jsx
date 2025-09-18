import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { setUser } from '../redux/UserAction';
import { LogOut } from 'lucide-react'; // אייקון של יציאה

export default function NavBar() {
  const currentuser = useSelector((state) => state.User.CurrentUser);
  const [isuserlogin, setisuserlogin] = useState(false);
  const c = localStorage.getItem("name");

  const logout = () => {
    localStorage.removeItem("name");
    localStorage.removeItem("token");
    localStorage.removeItem("_id");
    setisuserlogin(false);
    setUser(null);
  };

  const check = () => {
    
    if (currentuser == null)
      setisuserlogin(false);
    else
      setisuserlogin(true);
  };

  useEffect(() => {
  const name = localStorage.getItem("name");
  if (name) {
    setisuserlogin(true);
  } else {
    setisuserlogin(false);
  }

  }, []);


  // מאפשר לעדכן את ה־Nav מבחוץ
  window.updateNavLoginStatus = check;

  return (
    <nav style={styles.navbar}>
      <ul style={styles.ul}>
        <li style={styles.li}><Link to="/" style={styles.link}>דף הבית</Link></li>

        <li style={styles.li}><Link to="/signup" style={styles.link}>הרשמה</Link></li>
        <li style={styles.li}><Link to="/login" style={styles.link}>התחברות</Link></li>
        <li style={styles.li}><Link to="/all-apartments" style={styles.link}>כל הדירות</Link></li>

        {isuserlogin &&
          <>
                  <li style={styles.li}><Link to="/personalarea" style={styles.link}>איזור אישי</Link></li>

            <li style={styles.li}><Link to="/my-apartment" style={styles.link}>הדירות שלי</Link></li>

            <li style={styles.li}>
              <button onClick={logout} style={styles.logoutBtn}>
                <LogOut size={18} style={{ marginLeft: '6px' }} />
                <span style={{ fontFamily: 'Varela Round' }}>התנתקות</span>
              </button>
            </li>
          </>
        }
      </ul>

      <h5 style={styles.userName}>{c}</h5>
    </nav>
  );
}

const styles = {
  navbar: {
    backgroundColor: '#b5ad86',
    borderBottom: '2px solidrgb(134, 124, 87)',
    padding: '12px 20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    direction: 'rtl',
    fontFamily: "'Varela Round', sans-serif",
  },
  ul: {
    display: 'flex',
    listStyle: 'none',
    gap: '16px',
    margin: 0,
    padding: 0,
  },
  li: {
    display: 'flex',
    alignItems: 'center',
  },

  link: {
    textDecoration: 'none',
    color: '#1b4332',
    fontSize: '16px',
    transition: '0.3s',
  },
  logoutBtn: {
    backgroundColor: '#b5ad87',
    color: '#1b4332',
    border: 'none',
    borderRadius: '30px',
    padding: '8px 16px',
    fontSize: '15px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    boxShadow: '0 0 10px #b5ad86',
    transition: '0.3s',
  },
  userName: {
    fontSize: '16px',
    margin: 0,
    color: '#1b4332',
  }
};
