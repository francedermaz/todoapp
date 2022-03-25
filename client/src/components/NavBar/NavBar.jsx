import { Link } from 'react-router-dom';
import styles from './NavBar.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const NavBar = ({is}) => {
    return(
        <div>
            <section className={styles.navbar}>
                <Link to={'/'}>
                    {
                        <h1 className={styles.logo}>todoit</h1>
                    }
                </Link>
                <div className={styles.menu}>
                    <Link to={'/about'}>
                        {
                            is==='about'?<h1 className={styles.titleglow}>About</h1>:<h1 className={styles.title}>About</h1>
                        }
                    </Link>
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