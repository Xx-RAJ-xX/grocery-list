import React, {useState,useEffect} from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import Alert from './Alert';
const App = () => {

  const [grocery, setGrocery] =useState("");
  const [list,setList] =useState([]);
  const [showClear,setShowClear] = useState(false);
  const [isEdit,setIsEdit] =useState(false);
  const [idin,setIdin] = useState(0);
  const [alert,setAlert] = useState({show: false, msg: "" , type:'' });
  
  const showAlert =(show =false,type='',msg='') =>{
    setAlert({show,type,msg});
  }

  const handleSubmit =(e) =>{
     e.preventDefault();    
       setIsEdit(false);
       if(grocery){
         const item={id: new Date().getTime().toString() , grocery};
         
         setList((list) =>{
           return [...list,item]
         });

         setGrocery('');
         showAlert(true, 'success', 'item added to the list');
       }
       else
       {
         showAlert(true, 'danger', 'please enter value');
       }

  }

  useEffect(()=>{
     if(list.length===0){setShowClear(false);}
     else{setShowClear(true);}
  },[list])

  const handleDelete =(id) =>{
    showAlert(true, 'danger', 'item removed');
    const newList =list.filter((item) =>item.id !==id);
    setList(newList);

  }

  const handleEdit =(grocery,id) =>{
    setGrocery(grocery);
    setIsEdit(true);
    setIdin(id);
    
  }

  const handleClear = () =>{
    showAlert(true, 'danger', 'empty list');
    setGrocery('');
    setList([]);
  }

  const handleEditSubmit = (e) =>{
    e.preventDefault();
       setIsEdit(false);
       if(grocery){

        
          list.map((item)=>{
            if(item.id===idin){
              return(
               item.grocery= grocery);
            }
            else{
              return(item.grocery);
            }
          })
        

         setGrocery('');
         showAlert(true, 'success', 'value changed');
       }
       else
       {
         showAlert(true, 'danger', 'please enter value');
       }


  }

  return (
    <section className='section-center'>
      
      
      <form onSubmit={isEdit ? handleEditSubmit : handleSubmit} className='grocery-form'>

       
        {alert.show && <Alert {...alert} removeAlert={showAlert} list={list} />}

        <h3>Grocery Bud</h3>
        <div className='form-control'>
        <input 
          type="text" 
          className="grocery"
          id="grocery" 
          placeholder='e.g. eggs'
          value={grocery} 
          onChange={(e) => setGrocery(e.target.value)} 
          />
        <button type="submit" className='submit-btn'>{isEdit ? 'edit' : 'submit'}</button>
        </div>
      </form>
      <div className='grocery-container'>
        <div className="grocery-list">
      {
        list.map((item)=>{
          const {id,grocery}=item;
          return(
            <article className="grocery-item" key={id}>
                <p className="title">{grocery}</p>
                <div className="btn-container">
                <button type='button' className='edit-btn' onClick ={()=>handleEdit(grocery,id)}><FaEdit /></button>
                <button type='button' className="delete-btn" onClick= {() =>handleDelete(id)} ><FaTrash /></button>
                </div>
            </article>
          );
        })
      }
      </div>

      {showClear && <button onClick={handleClear} className='clear-btn'>clear items</button>}
     </div>
    </section>
  )
}

export default App
