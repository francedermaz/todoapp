import { useEffect } from 'react';
import NavBar from '../NavBar/NavBar';
import styles from './Home.module.css';
import { useSelector, useDispatch } from "react-redux";
import { getFolders, getItems } from '../../redux/actions';

const Home = () => {
    let aux = { name: "" };
    if (localStorage.getItem("user")) {
      aux = localStorage.getItem("user");
      aux = JSON.parse(aux);
    }
    const dispatch = useDispatch();
    
    let foldernum=null;
    const items = useSelector(state=>state.items);
    const folders = useSelector(state=>state.folders);

    useEffect(()=>{
        dispatch(getFolders(aux.id)); //Get folders
        dispatch(getItems(aux.id,foldernum));
    },[dispatch])

    return(
        <div>
            <NavBar/>
            <div>
                <ul>
                {
                    items?.map(el=>{
                        return <li>{el.name}</li>
                    })
                }
                </ul>
                <ul>
                {
                    folders?.map(el=>{
                        return <li>{el.name}</li>
                    })
                }
                </ul>
            </div>
        </div>
    )
}

export default Home;