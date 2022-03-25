import { Link } from 'react-router-dom';
import styles from './NavBar.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const NavBar = ({is}) => {
    let aux = { name: "" };
    if (localStorage.getItem("user")) {
      aux = localStorage.getItem("user");
      aux = JSON.parse(aux);
    }
    return(
        <div>
            <section className={styles.navbar}>
                <Link to={'/'}>
                    {
                        <h1 className={styles.logo}>todoit</h1>
                    }
                </Link>
                <div className={styles.menu}>
                    {
                        aux.id?<Link to={'/home'}>
                        {
                            is==='home'?<h1 className={styles.titleglow}>Home</h1>:<h1 className={styles.title}>Home</h1>
                        }
                    </Link>:<Link to={'/login'}>
                        {
                            is==='home'?<h1 className={styles.titleglow}>Home</h1>:<h1 className={styles.title}>Home</h1>
                        }
                    </Link>
                    }
                    <Link to={'/contact'}>
                        {
                            is==='contact'?<h1 className={styles.titleglow}>Contact</h1>:<h1 className={styles.title}>Contact</h1>
                        }
                    </Link>
                    <div className={styles.divlogin}>
                    <Link to={'/login'}>
                    {
                        <FontAwesomeIcon className={styles.user} icon={faUser} />
                    }
                    </Link>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default NavBar;