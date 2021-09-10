
import firestore from '@react-native-firebase/firestore';

export  async function getFirestoreUser(user) {
    console.log('im running firestore', user)
    const response = await firestore().collection('users').doc(user.data).get();
    return response
}