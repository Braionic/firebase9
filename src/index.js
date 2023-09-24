import { async } from '@firebase/util';
import { initializeApp } from 'firebase/app'
import {
  getFirestore, collection,
   getDocs, getDoc, addDoc, 
   deleteDoc, doc, onSnapshot, query, where, orderBy, serverTimestamp, updateDoc, 
} from 'firebase/firestore'
import { getAuth,createUserWithEmailAndPassword, signOut } from 'firebase/auth'

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
  const q = query(collectionref, where("title", "!=", "ooooooo"), orderBy("title", "desc"))
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
onSnapshot(q, (snapshot)=>{
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
        author: adddoc.author.value,
        createdAt: serverTimestamp()
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

const singlecol = doc(db, 'books', "CbAn0mQOzdCNxhLU1MwU")
onSnapshot(singlecol, (snapshot)=>{
    console.log(snapshot.data(), snapshot.id)

})

const updateasingle = document.querySelector(".update");
updateasingle.addEventListener("submit", ((e)=>{
    e.preventDefault()
    const updatesinglecol = doc(db, 'books', "CbAn0mQOzdCNxhLU1MwU")
    updateDoc(updatesinglecol, {
        title: updateasingle.field.value
    }).then(()=>{
        updateasingle.reset()
    }).catch((err)=> console.log(err.message))
}))

const signupquery = document.querySelector('.signup');
signupquery.addEventListener("submit", (e)=>{
    e.preventDefault()
    const email = signupquery.email.value;
    const password = signupquery.password.value;
    const auth = getAuth()
    createUserWithEmailAndPassword(auth, email, password).then((cred)=>{
        console.log(cred.user)
    }).catch((err)=>{
        console.log(err.message)
    })
})


