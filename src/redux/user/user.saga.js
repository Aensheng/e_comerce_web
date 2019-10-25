import { takeLatest, put, all, call } from 'redux-saga/effects'

import UserActionTypes from './user.types'
import { 
    signInSuccess, 
    signInFailure, 
    signOutSuccess, 
    signOutFailure,
    signUpSuccess,
    signUpFailure
} from './user.actions'

import { googleProvider, auth, createUserProfileDocument, getCurrentUser } from '../../firebase/firebase.utils'

export function* getSnapShotFromUserAuth(userAuth, addtionalData) {
    try {
        const userRef = yield call(createUserProfileDocument, userAuth, addtionalData)
        const userSnapshot = yield userRef.get()
        yield put(
            signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() })
        )
    } catch (error) {
        yield put(signInFailure(error))
    }
}

export function* signInwithGoogle() {
    try {
        const { user } = yield auth.signInWithPopup(googleProvider)
        yield getSnapShotFromUserAuth(user)
    } catch (error) {
        yield put(signInFailure(error))
    }
}

export function* isUserAuthenticated() {
    try {
        const userAuth = yield getCurrentUser()
        if(!userAuth) return
        yield getSnapShotFromUserAuth(userAuth)
    } catch (error) {
        yield put(signInFailure(error))
    }
}

export function* signInwithEmail({ payload: { email, password }}) {
    try { 
        const { user } = yield auth.signInWithEmailAndPassword(email, password)
        yield getSnapShotFromUserAuth(user)
    } catch (error) {
        yield put(signInFailure(error))
    }
}

export function* signOut() {
    try {
        yield auth.signOut()
        yield put(signOutSuccess())
    } catch (error) {
        yield put(signOutFailure())
    }
}

export function* signUp({payload: {email, password, displayName}}) {
    try {
        const { user } = yield auth.createUserWithEmailAndPassword(email, password)
        yield put(signUpSuccess({ user, addtionalData:{ displayName } }))
    } catch (error) {
        yield put(signUpFailure(error))
    }
}

export function* signInAfterSignUp({payload: {user, addtionalData}}) {
    yield getSnapShotFromUserAuth(user, addtionalData)
}

export function* onGoogleSignInStart() {
    yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START, signInwithGoogle)
}

export function* onEmailSignInStart() {
    yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_START, signInwithEmail)
}

export function* onCheckUserSession() {
    yield takeLatest(UserActionTypes.CHECK_USER_SESSION, isUserAuthenticated)
}

export function* onSighOutStart() {
    yield takeLatest(UserActionTypes.SIGN_OUT_START, signOut)
}

export function* onSignUpStart() {
    yield takeLatest(UserActionTypes.SIGN_UP_START, signUp)
}

export function* onSignUpSuccess() {
    yield takeLatest(UserActionTypes.SIGN_UP_SUCCESS, signInAfterSignUp)
}

export function* userSagas() {
    yield all([
        call(onGoogleSignInStart), 
        call(onEmailSignInStart),
        call(onCheckUserSession),
        call(onSighOutStart),
        call(onSignUpStart),
        call(onSignUpSuccess)
    ])
}