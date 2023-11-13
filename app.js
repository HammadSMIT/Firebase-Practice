import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js";
import { getFirestore, collection, addDoc , getDocs } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyCKKza13bTnkwERryKXWP4ajOiqZT_4GZk",
    authDomain: "practice-6b03b.firebaseapp.com",
    projectId: "practice-6b03b",
    storageBucket: "practice-6b03b.appspot.com",
    messagingSenderId: "423506508770",
    appId: "1:423506508770:web:36bccb8c678bd05df4d7bb",
    measurementId: "G-FS8WX2VL2N"
};



const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);


// ============== SIGN UP =================

let btn = document.querySelector("#Sbtn")

if(btn){
    btn.addEventListener("click", () => {

        let getemail = document.querySelector("#Semail")
        let getpass = document.querySelector("#Spass")
    
        createUserWithEmailAndPassword(auth, getemail.value, getpass.value)
            .then(async(userCredential) => {
                const user = userCredential.user.email;
                console.log(user)
                localStorage.setItem("Email", getemail.value)
                localStorage.setItem("Password", getpass.value)
    
                try {
                    const docRef = await addDoc(collection(db, "users"), {
                        first: getemail.value,
                        last: getpass.value,
                    
                    });
                    console.log("Document written with ID: ", docRef.id);
                    alert("Han Theek hai");
                    location.href = "./signin.html"
    
                } catch (e) {
                    console.error("Error adding document: ", e);
                }
    
    
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(error)
            });
    
    })
    
}
    


// ============== SIGN IN =================

let btn1 = document.querySelector("#Lbtn")

if(btn1){
    btn1.addEventListener("click" , () =>{

        let getemail = document.querySelector("#Lemail")
        let getpass  = document.querySelector("#Lpass")
    
    signInWithEmailAndPassword(auth, getemail.value , getpass.value)
      .then((userCredential) => {
        const user = userCredential.user.email;
        console.log(user)
        location.href = "./welcome.html"
    
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(error)
      })
    })
    
}


// =============== logout =================

let logoutbtn = document.querySelector("#LObtn")
logoutbtn.addEventListener("click", () => {
    localStorage.clear()
    location.href = "./logout.html"
})

let showbtn = document.querySelector("#show")
if(showbtn){
   
    let getDiv = document.getElementById("getUsers")

    showbtn.addEventListener("click" , async()=>{
        const hammad = await getDocs(collection(db, "users"));
        hammad.forEach((doc) => {
            getDiv.innerHTML += `<div>${doc.data().first}</div>
            <div>${doc.data().last}</div>
            `
            
        //   console.log(`${doc.id} => ${doc.data()}`);
        });
    } )
}
