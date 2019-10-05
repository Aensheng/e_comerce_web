import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const config = {
    apiKey: "AIzaSyA5xiV5JCWBokCQUSYRySWmiVU5IThMZNQ",
    authDomain: "sneaker-db.firebaseapp.com",
    databaseURL: "https://sneaker-db.firebaseio.com",
    projectId: "sneaker-db",
    storageBucket: "",
    messagingSenderId: "954044165655",
    appId: "1:954044165655:web:f82111389ac00553fcb652",
    measurementId: "G-V93DVHNRFE"
}

firebase.initializeApp(config)

export const createUserProfileDocument = async (userAuth, additionlData) => {
    if(!userAuth) return
    const userRef = firestore.doc(`users/${userAuth.uid}`)

    const snapShot = await userRef.get()

    if(!snapShot.exists){
        const { displayName, email } = userAuth
        const createdAt = new Date()

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionlData
            })
        } catch (error){
            console.log('error creating user', error.message)
        }
    }

    return userRef
}



export const auth = firebase.auth()
export const firestore = firebase.firestore()

const provider = new firebase.auth.GoogleAuthProvider()
provider.setCustomParameters({prompt: 'select_account'})
export const signInWithGoogle = () => auth.signInWithPopup(provider)

export default firebase