import NavBar from '../NavBar/NavBar';
import styles from './Contact.module.css';

const Contact = () => {
    return(
        <div>
            <NavBar/>
            <div className={styles.content}>
            <h1 align="center">Hi 👩‍💻, I'm Francisco</h1>
            <h3 align="center">Full Stack Developer</h3>
            📫 - For inquiries, you can find me in <a href="https://www.linkedin.com/in/francisco-cedermaz-4216571b8/" target="_blank">LinkedIn</a> or at my email <a href="https://www.google.com" target="_blank">francedermaz@gmail.com</a>
            </div>
        </div>
    )
}

export default Contact;