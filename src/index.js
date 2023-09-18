import { async } from '@firebase/util';
import { initializeApp } from 'firebase/app'
import {
  getFirestore, collection, getDocs, addDoc, deleteDoc, doc, onSnapshot
} from 'firebase/firestore'


const firebaseConfig = {
    apiKey: "AIzaSyB83LRWjI36_F1mJa7H7G78_7702mBqyGY",
    authDomain: "fir-9-ea0a3.firebaseapp.com",
    projectId: "fir-9-ea0a3",
    storageBucket: "fir-9-ea0a3.appspot.com",
    messagingSenderId: "156082323905",
    appId: "1:156082323905:web:bbd9f88baa18f0b7242f40"
  };
// initialize firebase
  initializeApp(firebaseConfig)
  // initialise firestore
  const db = getFirestore()
  //initialise database
  const collectionref = collection(db, "books")
  /*

  getDocs(collectionref).then((snapshot)=>{
    const book = []
    snapshot.docs.map((doc)=> book.push({...doc.data(), id: doc.id}))
    console.log(book)
    const mybook = book.map((boo)=> boo.title)
    const getelement = document.querySelector(".demo").innerHTML = mybook.join("/");
    return getelement;
}
)
*/
// get realtime update
onSnapshot(collectionref, (snapshot)=>{
const realdata = []
snapshot.docs.forEach((doc)=>{
    realdata.push({...doc.data(), id: doc.id})
})
console.log(realdata)
})
//add doc
const adddoc = document.querySelector("#add");
adddoc.addEventListener('submit', (e)=>{
    e.preventDefault()
    addDoc(collectionref, {
        title: adddoc.title.value,
        author: adddoc.author.value
    }).then(()=>{adddoc.reset()}).catch((err)=>{ err.message})
})

//dell doc

const delm = document.querySelector('#del');


delm.addEventListener('submit', (e)=>{
    e.preventDefault()
    const delitem = delm.id.value;
    const docRefs = doc(db, 'books', delitem);
     deleteDoc(docRefs).then(()=> delm.reset()).catch((err)=> err.message)
})
