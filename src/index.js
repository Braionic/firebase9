import { initializeApp } from 'firebase/app'
import {
  getFirestore, collection, getDocs
} from 'firebase/firestore'


const firebaseConfig = {
    apiKey: "AIzaSyB83LRWjI36_F1mJa7H7G78_7702mBqyGY",
    authDomain: "fir-9-ea0a3.firebaseapp.com",
    projectId: "fir-9-ea0a3",
    storageBucket: "fir-9-ea0a3.appspot.com",
    messagingSenderId: "156082323905",
    appId: "1:156082323905:web:bbd9f88baa18f0b7242f40"
  };

  initializeApp(firebaseConfig)
  const db = getFirestore()
  const collectionref = collection(db, "books")
  getDocs(collectionref).then((snapshot)=>{
    const book = []
    snapshot.docs.map((doc)=> book.push({...doc.data(), id: doc.id}))
    console.log(book)
    const mybook = book.map((boo)=> boo.title)
    const getelement = document.querySelector(".demo").innerHTML = mybook.join("/");
    return getelement;
})

