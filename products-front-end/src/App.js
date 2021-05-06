import logo from './logo.svg';
import './App.css';
import React, {useEffect, useState} from 'react';
import axios from 'axios';

function App() {
let display; 
let [products, setProducts] = useState([]);
 useEffect(()=>{
    function getProducts(){
      axios.get('/api/products').then(res=>{
        console.log(res)
        setProducts(res.data);
      }).catch(err=>{
        console.log(err)
      })
    }
    getProducts();
 },[]);

 let [viewProducts, setViewProducts] = useState(false);

 let [viewEdit, setViewEdit] = useState(false);
 let [editName, setEditName] = useState('')
 let [editPrice, setEditPrice] = useState('')
 let [editDescription, setEditDescription] = useState('');
 let [editId, setEditId] = useState('')

 let [viewDelete, setViewDelete] = useState(false);
 let [viewAdd, setViewAdd] = useState(false);

 function closeWindows(openWindow){
    setViewProducts(false);
    setViewEdit(false);
    setViewDelete(false);
    setViewAdd(false);
 }
 function handleEdit(e){
   e.preventDefault();
   console.log(editId);
   axios.put(`/api/products/${editId}`, {description: editDescription})
   .then(res=>{
     console.log(res)
   }).catch(err=>{console.log(err)})
 }

 if (viewProducts === true){
    display = (
      <div>
       {products.map(product=>{
         return(
           <div key={product.product_id}>
             <span>{product.name}</span>
             <span>{product.description}</span>
             <span>{product.price}</span>
           </div>
         )
       })}
     </div>
    )
 }
 else if (viewEdit === true){
   display = (<div>
     <select onChange={(e)=>{setEditId(e.target.value)}}>
       <option>choose product</option>
       {products.map(product=>{
         return (
           <option key={product.product_id} value={product.product_id}>{product.name}</option>
         )
       })}
      
     </select>
     <form>
       <span>change name</span>
       <input  type="text" onChange={(e)=> {setEditName(e.target.value)}}/>
       <span>change price</span>
       <input type="text"  onChange={(e)=>{setEditPrice(e.target.value)}}/>
       <span>change description</span>
       <input type="text"  onChange={(e)=>{setEditDescription(e.target.value)}}/>
       <input type="submit" onClick={(e)=>{handleEdit(e)}} />
     </form>
   </div>)
 }
 else if (viewDelete === true){
   display = (
     <div>
       delete
     </div>
   )
 }
 else if (viewAdd === true){
   display = (
     <div>
       add
     </div>
   )
 }

  return (
    <div >
      <div>
     <button onClick={()=>{closeWindows(); setViewProducts(true)}}>view products</button>
     <button onClick={()=>{closeWindows(); setViewEdit(true)}}>edit products</button>
     <button onClick={()=>{closeWindows(); setViewDelete(true)}}>delete products</button>
     <button onClick={()=>{closeWindows(); setViewAdd(true)}}>delete products</button>
     </div>
    <div id="productDisplayContainer">
     {display}
     </div>
    </div>
  );
}

export default App;
