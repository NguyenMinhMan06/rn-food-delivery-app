import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';


export const User = {
    loginWithEmail: (userInfo) => {
        console.log('Login firebase API')
        return auth()
            .signInWithEmailAndPassword(userInfo.data.email, userInfo.data.password)
            .then(response => response).catch(error => {
                if (error.code) {
                    return error.code
                }
                console.error(error);
            });
    },
    registerWithEmail: (userInfo) => {
        console.log('firebase register user send API')
        return auth()
            .createUserWithEmailAndPassword(userInfo.data.email, userInfo.data.password)
            .then(response => {
                console.log('resposne API', response.user.uid)
                firestore().collection('users').doc(response.user.uid).set({
                    email: userInfo.data.email,
                    role: '',
                    name: userInfo.data.name,
                    phoneNumber: response.user.phoneNumber,
                    avatar: '',
                    branch: ''
                }).then(() => { console.log('firestore added user completed') })
                return response
            }).catch(error => {
                if (error.code) {
                    return error.code
                }
                console.error(error);
            });

    },
    logOutEmail: () => {
        console.log('im logging out')
        return auth().signOut().then(() => console.log('User signed out!'));
    },

}
