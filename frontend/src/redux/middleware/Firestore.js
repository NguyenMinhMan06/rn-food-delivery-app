
import firestore from '@react-native-firebase/firestore';

export async function getFirestoreUser(user) {
    // console.log('im running firestore', user)
    const response = await firestore().collection('users').doc(user.data).get();
    return response
}

export const foodItem = {
    getFoodItem: async () => {
        const list = []
        firestore()
            .collection('foods')
            .doc("foodDetail")
            .collection("food")
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    const { foodName, catName, price, rating, catId } = doc.data()
                    list.push({
                        id: doc.id,
                        catId: catId,
                        foodName: foodName,
                        catName: catName,
                        price: price,
                        rating: rating
                    })
                })
            })
        return list
    },
    getFoodCat: async () => {
        const listCat = []
        firestore()
            .collection('foods')
            .doc("foodCat")
            .collection("category")
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    const { catName } = doc.data()
                    listCat.push({
                        id: doc.id,
                        name: catName
                    })
                })
            })
        return listCat
    },
}

export const favoriteItem = {
    addFavItem: async (action) => {
        const item = action.data.item
        const userId = action.data.userId
        const data = []
        await firestore()
            .collection('users')
            .doc(`${userId}`)
            .collection('favorite')
            .doc(`${item.id}`)
            .set({
                foodName: item.foodName,
                price: item.price,
                rating: item.rating,
                catName: item.catName,
                catId: item.catId,
            })
            .then(() => {
                data.push({
                    id: item.id,
                    foodName: item.foodName,
                    price: item.price,
                    rating: item.rating,
                    catName: item.catName,
                    catId: item.catId,
                })
                console.log('add favorite successfully', data)
            })
        return data

    },
    removeFavItem: async (action) => {
        const itemId = action.data.itemId
        const userId = action.data.userId
        console.log('action: ', action)
        firestore()
            .collection('users')
            .doc(`${userId}`)
            .collection('favorite')
            .doc(`${itemId}`)
            .delete()
            .then(() => {
                console.log('delete favorite successed')
            }).catch(err => console.log(err))
            return itemId
    },
    getFavItem: async (action) => {
        const list = []
        const userId = action.data
        firestore()
            .collection('users')
            .doc(`${userId}`)
            .collection('favorite')
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    const { foodName, catName, price, rating, catId } = doc.data()
                    list.push({
                        id: doc.id,
                        foodName: foodName,
                        catName: catName,
                        price: price,
                        rating: rating,
                        catId: catId,
                    })
                })
            })
        return list
    }
}