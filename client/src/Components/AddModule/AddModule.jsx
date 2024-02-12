import { style } from '@mui/system'
import React from 'react'
import './AddModule.css'
import { useSelector } from 'react-redux'

const AddModule = ({hide}) => {
    const expenses = useSelector((state)=> state.expenses);
  return (
    <div>
      <div 
        className="modal-wrapper" 
        onClick={() => hide()} 
        style={{position:' fixed',
        left:'0',
        right: '0',
        bottom: '0',
        top: '0',
        backgroundColor: 'rgba(230, 226, 226, 0.804)'}}
        ></div>
        <div 
        style={{position: 'fixed',
        top: '50%',
        left: '50%',
        marginTop: '-300px',
        marginLeft: '-200px',
        backgroundColor: '#fff',
        borderRadius: '10px',
        width: '400px',
        height: '600px'}}
        >
            <select name="expense" >
                {
                    expenses.map((x)=> {
                        return (
                            <option value=""></option>
                        )
                    })
                }
            </select>
        </div>
    </div>
  )
}

export default AddModule