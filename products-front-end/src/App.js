import './App.css';
import React, {useEffect, useState} from 'react';
import axios from 'axios';

function App() {
let display;
let [changeInProducts, setChangeInProducts] = useState(0); 
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
 },[changeInProducts]);

 let [viewProducts, setViewProducts] = useState(false);

 let [viewEdit, setViewEdit] = useState(false);
 let [editName, setEditName] = useState('')
 let [editPrice, setEditPrice] = useState('')
 let [editDescription, setEditDescription] = useState('');
 let [editId, setEditId] = useState('');
 let [editImageURL, setEditImageURL] = useState('')

let [viewDelete, setViewDelete] = useState(false);
let [deleteId, setDeleteId] = useState('');

 let [viewAdd, setViewAdd] = useState(false);
 let [addName, setAddName] = useState('')
 let [addPrice, setAddPrice] = useState('')
 let [addDescription, setAddDescription] = useState('');
 let [addImageURL, setAddImageURL] = useState('')

 function closeWindows(openWindow){
    setViewProducts(false);
    setViewEdit(false);
    setViewDelete(false);
    setViewAdd(false);
 }
 function handleEdit(e){
   e.preventDefault();
   if (editId === ""){
     alert('select product to edit');
     return;
   }
   console.log(editId);
   axios.put(`/api/products/${editId}`, {description: editDescription,
  name: editName, price: editPrice, image_url: editImageURL})
   .then(res=>{
     console.log(res)
     setChangeInProducts(changeInProducts+ 1);
   }).catch(err=>{console.log(err)});
   alert('update complete')
   setViewEdit(false);
   setEditId("")
   setEditImageURL('');
   setEditPrice('');
   setEditDescription('');
   setEditName('');
 }
 function handleAdd(e){
   e.preventDefault();
   if (addName === "" || addPrice === "" || addImageURL === "" || addDescription === ""){
     alert('please provide values for all categories');
     return
   }
   let test = isNaN(addPrice);
   if (test === true){
     alert('please enter a valid number for price');
     return;
    }
  axios.post('/api/products', {description: addDescription,
    name: addName, price: addPrice, image_url: addImageURL}).then(response=>{
      console.log(response);
      setChangeInProducts(changeInProducts+ 1);
      setAddDescription('');
      setAddImageURL('');
      setAddName('');
      setAddPrice('');
      alert('add complete');
      setViewAdd(false);
    }).catch(err=>{console.log(err); alert('add failed')})

 }
 function handleDelete(){
   axios.delete(`/api/products/${deleteId}`).then(response=>{
     console.log(response);
     setChangeInProducts(changeInProducts+ 1);
   }).catch(err=>{console.log(err)})
 }
 function inputPlaceHolders(e){
  
   let selectedProduct = null;
    for (let i = 0; i < products.length; i++){
        if (products[i].product_id === parseInt(e)){
          selectedProduct = products[i];
        }
    }
    if(selectedProduct === null){
      console.log('null');
      return;
    }
    else{
      setEditName(selectedProduct.name);
      setEditPrice(selectedProduct.price);
      setEditDescription(selectedProduct.description);
      setEditImageURL(selectedProduct.image_url);
    }
 }

 if (viewProducts === true){
    display = (
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody>
       {products.map(product=>{
         return(
           <tr key={product.product_id}>
             <td>{product.name}</td>
             <td>{product.description}</td>
             <td>{product.price}</td>
             <td>{product.image_url}</td>
           </tr>
         )
       })}
       </tbody>
     </table>
    )
 }
 else if (viewEdit === true){
   display = (<div>
     <select onChange={(e)=>{setEditId(e.target.value); inputPlaceHolders(e.target.value);}}>
       <option>choose product</option>
       {products.map(product=>{
         return (
           <option key={product.product_id} value={product.product_id}>{product.name}</option>
         )
       })}
      
     </select>
     <form>
       <span>change name</span>
       <input  type="text" placeholder={editName} onChange={(e)=> {setEditName(e.target.value)}}/>
       <span>change price</span>
       <input type="text" placeholder={editPrice} onChange={(e)=>{setEditPrice(e.target.value)}}/>
       <span>change description</span>
       <input type="text" placeholder={editDescription} onChange={(e)=>{setEditDescription(e.target.value)}}/>
       <span>change image url</span>
       <input type="text" placeholder={editImageURL} onChange={(e)=>{setEditImageURL(e.target.value)}}/>
       <input type="submit" onClick={(e)=>{handleEdit(e)}} />
     </form>
   </div>)
 }
 else if (viewDelete === true){
   display = (
     <div>
       <select onChange={(e)=>{setDeleteId(e.target.value)}}>
       <option>choose product to delete</option>
       {products.map(product=>{
         return (
           <option key={product.product_id} value={product.product_id}>{product.name}</option>
         )
       })}
       </select>
       <button onClick={()=>{handleDelete()}}>delete product</button>
     </div>
   )
 }
 else if (viewAdd === true){
   display = (
     <div>
       <form>
       <span>name</span>
       <input  type="text" onChange={(e)=> {setAddName(e.target.value)}}/>
       <span>price</span>
       <input type="text"  onChange={(e)=>{setAddPrice(e.target.value)}}/>
       <span>description</span>
       <input type="text" onChange={(e)=>{setAddDescription(e.target.value)}}/>
       <span>image url</span>
       <input type="text"  onChange={(e)=>{setAddImageURL(e.target.value)}}/>
       <input type="submit" onClick={(e)=>{handleAdd(e)}} />
     </form>
     </div>
   )
 }

  return (
    <div id="mainContainer" >
      <div id="buttonDisplayContainer">
     <button onClick={()=>{closeWindows(); setViewProducts(true)}}>view products</button>
     <button onClick={()=>{closeWindows(); setViewEdit(true)}}>edit products</button>
     <button onClick={()=>{closeWindows(); setViewDelete(true)}}>delete products</button>
     <button id="lastButton" onClick={()=>{closeWindows(); setViewAdd(true)}}>add products</button>
     <div class="fauxButton"></div>
     </div>
    <div id="productDisplayContainer">
     {display}
     </div>
    </div>
  );
}

export default App;
