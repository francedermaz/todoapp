import { useDispatch } from 'react-redux';
import { logoutUser } from '../../redux/actions';
import NavBar from '../NavBar/NavBar';
import styles from './Account.module.css';

const Account = () => {
    let aux = { name: "" };
    if (localStorage.getItem("user")) {
      aux = localStorage.getItem("user");
      aux = JSON.parse(aux);
    }

    const dispatch = useDispatch();

    function handleLogout() {
        dispatch(logoutUser())
        .then(() => {
            window.location.href = "http://localhost:3000/";
        });
    }

    return(
        <div>
            <NavBar/>
            <div className={styles.page}>
                <div className={styles.account}>
                    <h2 className={styles.subtitle}>Hi {aux.name}</h2>
                    <button className={styles.button} onClick={()=>handleLogout()}>Logout</button>
                </div>
            </div>
        </div>
    )
}

export default Account;