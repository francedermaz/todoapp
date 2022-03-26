import { useEffect, useState } from 'react';
import NavBar from '../NavBar/NavBar';
import styles from './Home.module.css';
import { useSelector, useDispatch } from "react-redux";
import { getFolders, getItems, postItem, deleteItem, deleteFolder } from '../../redux/actions';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolderPlus } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from 'react-router-dom';


const Home = () => {
    // User in Local St.
    let aux = { name: "" };
    if (localStorage.getItem("user")) {
      aux = localStorage.getItem("user");
      aux = JSON.parse(aux);
    }

    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    // Data
    const items = useSelector(state=>state.items);
    const folders = useSelector(state=>state.folders);

    // Create item
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
                folderId:foldernum,
                userId:aux.id
            }));
        }
        setInput({
            name:'',
        })
        window.location.replace('');
    }

    // Folder in null (Home)
    let foldernum=null;

    function handleFolderClick(id){
        navigate(`/folder/${id}`)
    }
    
    // Delete item
    function deleteItemfunction(id){
        console.log(id)
        dispatch(deleteItem(id))
        window.location.replace('');
    }

    // Edit Item
    function editItemfunction(id){  //ver

    }

    // Create folder
    function createFolder(){
        dispatch(createFolder({name:'',userId:aux.id})) //ver
    }
    
    // Delete folder
    function deleteFolderfunction(id){
        dispatch(deleteFolder(id));
    }

    useEffect(()=>{
        dispatch(getFolders(aux.id)); //Get folders
        dispatch(getItems(aux.id,foldernum));
    },[dispatch])

    return(
        <div>
            <NavBar/>
            <div className={styles.page}>
                <h1 className={styles.title}>What's your plan for today?</h1>
                <section className={styles.top}>
                    <form onSubmit={e=>handleSubmit(e)}>
                        <input className={styles.input}
                        value={input.name} type='text' name='name' placeholder="Add a todo" onChange={e=>handleChange(e)}>
                        </input>
                        {
                            input.name.trim()!=='' && input.name.trim().length>3?<button className={styles.bttn} type="submit">Create</button>:<button className={styles.bttndis} disabled>Create</button>
                        }
                    </form>
                    <FontAwesomeIcon onClick={()=>createFolder()} className={styles.user} icon={faFolderPlus} />
                </section>
                <ul>
                {
                    items?.map(el=>{
                        return <li className={styles.li}>
                            <p className={styles.name}>{el.name}</p>
                            <button onClick={()=>deleteItemfunction(el.id)}>x</button>
                            <button onClick={()=>editItemfunction(el.id)}>Edit</button>
                            </li>
                    })
                }
                </ul>
                <ul>
                {
                    folders?.map(el=>{
                        return <li>
                            <p onClick={()=>handleFolderClick(el.id)}>{el.name}</p>
                            <button onClick={()=>deleteFolderfunction(el.id)}>x</button>
                        </li>
                       
                    })
                }
                </ul>
            </div>
        </div>
    )
}

export default Home;