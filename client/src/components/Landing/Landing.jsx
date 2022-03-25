import NavBar from '../NavBar/NavBar';
import styles from './Landing.module.css';
import tree from './assets/tree.png';
import {Link} from 'react-router-dom';

const Landing = () => {
    return(
        <div>
            <NavBar/>
            <div className={styles.text}>
                <img className={styles.img} src={tree} alt="tree"/>
                <h1 className={styles.first}>Organize it all</h1>
                <h1 className={styles.second}>with Todoit</h1>
                <Link to="/login">
                    <button className={styles.button}>Get started</button>
                </Link>
            </div>
        </div>
    )
}

export default Landing;