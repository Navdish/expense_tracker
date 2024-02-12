import './Home.css'
import Cookies from 'js-cookie';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux'
import {useState,  useEffect } from 'react';
import {fetchExpenses, addExpenses, editExpenses, fetchCategory, addCategory } from '../../Store/Slices/userSlice'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import AddModule from '../AddModule/AddModule.jsx'
// import Button from '@mui/material/Button';

function Home() {
    axios.defaults.headers.common['jwt-token'] = Cookies.get('token');
    const dispatch = useDispatch();
    
    const expenses = useSelector((state)=> state.expenses);
    const categories = useSelector((state)=> state.categories);

    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("food");
    const [prevDate, setPrevDate] = useState("2022-03-25");
    const [nextDate, setNextDate] = useState("2025-03-25");
    useEffect(()=> {
            dispatch(fetchExpenses({search, category, prevDate, nextDate}));
            dispatch(fetchCategory());
            console.log("...");
    },[search, category, prevDate, nextDate])

    console.log("expenses",expenses);
    console.log("categories", categories);

    const [showAdd, setShowAdd] = useState(false)

    const handleCategory = () => {
      document.getElementById("myDropdown").classList.toggle("show");
    }
    window.onclick = function(event) {
      if (!event.target.matches('.dropbtn')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
          var openDropdown = dropdowns[i];
          if (openDropdown.classList.contains('show')) {
            openDropdown.classList.remove('show');
          }
        }
      }
    }
    const showAddModal = () => {
      setShowAdd(true)
      
    }
    const handleAdd = () => {
      setShowAdd(false)
    }

    return (
        <>
        <div className='bar'>
            <div className='transaction-heading'>Transactions</div>
            <div className='bar-right'>
                <div className='category-drop'>Category<ArrowDropDownIcon/></div>
                    <div className="dropdown">
                        
                    </div>
                <button className='add-btn' onClick={() => showAddModal()}>Add +</button>
            </div>
        </div>
        {showAdd && <AddModule hide={handleAdd} />}
        </>
    )
}

export default Home;