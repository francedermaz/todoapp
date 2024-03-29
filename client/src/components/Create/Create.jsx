import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createFolder } from '../../redux/actions';
import NavBar from '../NavBar/NavBar';
import styles from './Create.module.css';

const Create = () => {
    let aux = { name: "" };
    if (localStorage.getItem("user")) {
      aux = localStorage.getItem("user");
      aux = JSON.parse(aux);
    }

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [input,setInput] = useState({
        name:''
    })

    function handleChange(e){
        e.preventDefault();
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        })
    }

    function handleSubmit(e){
        e.preventDefault();
        if(input.name.trim()!=='' && input.name.trim().length>3){
            dispatch(createFolder({
                userId:aux.id,
                name:input.name
            }));
        }
        setInput({
            name:'',
        })
        navigate('/home');
    }
    return(
        <div>
            <NavBar/>
            <div className={styles.page}>
                <div className={styles.div}>
                <h2 className={styles.title}>Create a folder</h2>
                <section className={styles.top}>
                        <form onSubmit={e=>handleSubmit(e)}>
                            <input className={styles.input}
                            value={input.name} type='text' name='name' placeholder="Name of your new folder" onChange={e=>handleChange(e)}>
                            </input>
                            {
                                input.name.trim()!=='' && input.name.trim().length>3 && input.name.length<20?<button className={styles.bttn} type="submit">Create</button>:<button className={styles.bttndis} disabled>Create</button>
                            }
                        </form>
                </section>
                </div>
                {
                    input.name.length>20?<p className={styles.error}>Folder's name cannot have more than 20 characters</p>:<></>
                }
            </div>
        </div>
    )
}

export default Create;