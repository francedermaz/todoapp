import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { editItem } from '../../redux/actions';
import NavBar from '../NavBar/NavBar';
import styles from './Edit.module.css';

const Edit = () => {
    // User in Local St.
    let aux = { name: "" };
    if (localStorage.getItem("user")) {
      aux = localStorage.getItem("user");
      aux = JSON.parse(aux);
    }

    const dispatch = useDispatch();
    const navigate = useNavigate()
    let {id} = useParams();

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
            dispatch(editItem({
                id:parseInt(id),
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
                <h2 className={styles.title}>Edit your todo</h2>
                <section className={styles.top}>
                        <form onSubmit={e=>handleSubmit(e)}>
                            <input className={styles.input}
                            value={input.name} type='text' name='name' placeholder="Enter your edited todo" onChange={e=>handleChange(e)}>
                            </input>
                            {
                                input.name.trim()!=='' && input.name.trim().length>3 && input.name.length<30?<button className={styles.bttn} type="submit">Submit</button>:<button className={styles.bttndis} disabled>Submit</button>
                            }
                        </form>
                </section>
                </div>
                {
                    input.name.length>30?<p className={styles.error}>Todoit's character limit is 30</p>:<></>
                }
            </div>
        </div>
    )
}

export default Edit;