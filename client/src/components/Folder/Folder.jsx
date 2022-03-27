import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { deleteItem, getFolders, getItems, postItem } from '../../redux/actions';
import NavBar from '../NavBar/NavBar';
import styles from './Folder.module.css';

const Folder = () => {
    // User in Local St.
    let aux = { name: "" };
    if (localStorage.getItem("user")) {
      aux = localStorage.getItem("user");
      aux = JSON.parse(aux);
    }

    const dispatch = useDispatch();
    const navigate = useNavigate();

    let {id} = useParams();

    const items = useSelector(state => state.items);

    const [input,setInput] = useState({
        userId:'',
        folderId:'',
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
            dispatch(postItem({
                name:input.name,
                folderId:id,
                userId:aux.id
            }));
        }
        setInput({
            name:'',
        })
        window.location.replace('');
    }

    // Delete item
    function deleteItemfunction(id){
        console.log(id)
        dispatch(deleteItem(id))
        window.location.replace('');
    }

    // Edit Item
    function editItemfunction(id){
        navigate(`/edit/item/${id}`)
    }

    useEffect(() => {
        dispatch(getItems(aux.id,id));
        dispatch(getFolders());
    }, [dispatch])
    return(
        <div>
            <NavBar/>
            <div className={styles.page}>
                <div className={styles.div}>
                <h2 className={styles.title}>Inside your folder</h2>
                <section className={styles.top}>
                    <form onSubmit={e=>handleSubmit(e)}>
                        <input className={styles.input}
                        value={input.name} type='text' name='name' placeholder="Add a todo" onChange={e=>handleChange(e)}>
                        </input>
                        {
                            input.name.trim()!=='' && input.name.trim().length>3?<button className={styles.bttn} type="submit">Create</button>:<button className={styles.bttndis} disabled>Create</button>
                        }
                    </form>
                </section>
                {
                    items?.map(el=>{
                        return <li className={styles.li}>
                            <p className={styles.name}>{el.name}</p>
                            <div className={styles.divbuttons}>
                                <button className={styles.buttonsdel} onClick={()=>deleteItemfunction(el.id)}>x</button>
                                <button className={styles.buttonsed} onClick={()=>editItemfunction(el.id)}>Edit</button>
                            </div>
                            </li>
                    })
                }
                </div>
            </div>
        </div>
    )
}

export default Folder;