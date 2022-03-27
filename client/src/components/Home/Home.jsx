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
    function editItemfunction(id){
        navigate(`/edit/item/${id}`)
    }

    // Create folder
    function createFolder(){
        navigate('/folder/create')
    }
    
    // Delete folder
    function deleteFolderfunction(id){
        dispatch(deleteFolder(id));
        window.location.replace('');
    }

    useEffect(()=>{
        dispatch(getFolders(aux.id)); //Get folders
        dispatch(getItems(aux.id,foldernum));
    },[dispatch])

    return(
        <div>
            <NavBar/>
            <div className={styles.page}>
                <div className={styles.div}>
                <h1 className={styles.title}>What's the plan for today?</h1>
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
                <ul>
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
                </ul>
                <div className={styles.top}>
                    <h3 className={styles.folder}>Your folders...</h3>
                    <FontAwesomeIcon onClick={()=>createFolder()} className={styles.foldericon} icon={faFolderPlus} />
                </div>
                <ul className={styles.ul}>
                {
                    folders?.map(el=>{
                        return <li className={styles.lifolder}>
                            <p className={styles.namefolder} onClick={()=>handleFolderClick(el.id)}>{el.name}</p>
                            <button className={styles.buttonsdel} onClick={()=>deleteFolderfunction(el.id)}>x</button>
                        </li>
                       
                    })
                }
                </ul>
                </div>
            </div>
        </div>
    )
}

export default Home;