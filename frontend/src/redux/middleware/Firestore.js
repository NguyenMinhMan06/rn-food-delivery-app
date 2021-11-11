
import firestore from '@react-native-firebase/firestore';
import Geocoder from 'react-native-geocoding';
import { objectIsNull, showToast } from '../../../utils/function';

export async function getFirestoreUser(user) {
    // console.log('im running firestore', user)
    const userInfo = await firestore().collection('users').doc(user.data).get().then((doc) => {
        // console.log('doc data', doc.data())
        return {
            ...doc.data(),
            id: doc.id
        }
    });
    return userInfo
}


export const firestoreUser = {
    addLocation: async (action) => {
        // console.log(action)
        Geocoder.init('AIzaSyC2ZpQKR3DYiAYB8FOcoQrJi-5cf727rbQ')
        const coords = action.data.coords
        const userId = action.data.userId
        const address = await Geocoder.from(coords).then(json => {
            console.log('JSONNN: ', json)
            let address1 = json.results[0].address_components[results.length - 1]
            let address2 = json.results[0].address_components[results.length - 2]
            return address1 + ", " + address2
        })
            .catch(error => {
                console.log(error)
                return "Viet Nam"
            });
        firestore()
            .collection('users')
            .doc(`${userId}`)
            .update({
                coords: coords,
                address: address
            }).then(() => {
                console.log('add location success')
            })
        return { coords: coords, address: address }
    },
    addPhone: async (action) => {
        console.log('data db:', action.data)
        const userId = action.data.userId
        const phoneNumber = action.data.phoneNumber
        const userInfo = await firestore().collection('users').doc(`${userId}`).update({ phoneNumber: phoneNumber }).then(() => {
            return phoneNumber
        })
        return userInfo
    }
}

export const firestoreCart = {
    getCart: async (action) => {
        const userId = action.data
        const list = []
        await firestore()
            .collection('users')
            .doc(`${userId}`)
            .collection('cart')
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    const data = doc.data()
                    list.push({ ...data, id: doc.id })
                    console.log(data)
                })
            })
        return list
    },
    addCart: async (action) => {
        const userId = action.data.userId
        const itemAdd = action.data.item
        const cart = firestore()
            .collection('users')
            .doc(`${userId}`)
            .collection('cart')
            .doc(`${itemAdd.id}`)

        const isItemExist = await cart.get().then(doc => {
            if (!objectIsNull(doc.data())) {
                return itemAdd.id == doc.id
            }
            else {
                return false
            }
        })

        if (isItemExist) {
            const quan = await cart.get().then(doc => {
                const { quantity } = doc.data()
                return quantity
            })
            await cart.update({
                quantity: quan + 1
            })
                .then(() => {
                    showToast('Add to cart successfully')
                    console.log('update complete')
                })
            return itemAdd
        }
        else {
            await cart
                .set({
                    catId: itemAdd.catId,
                    catName: itemAdd.catName,
                    foodName: itemAdd.foodName,
                    price: itemAdd.price,
                    quantity: itemAdd.quantity,
                    rating: itemAdd.rating,
                    quantity: 1
                })
                .then(() => {
                    showToast('Add to cart successfully')
                    console.log('set current cart succesfully')
                })
            return itemAdd
        }
    },
    removeCart: async (action) => {
        const userId = action.data.userId
        const itemRemove = action.data.item
        const cart = firestore()
            .collection('users')
            .doc(`${userId}`)
            .collection('cart')
            .doc(`${itemRemove.id}`)
        const quan = await cart.get().then(doc => {
            console.log('datadoc: ', doc.data())
            const { quantity } = doc.data()
            return quantity
        })

        if (quan <= 1) {
            await cart.delete()
                .then(() => {
                    console.log('delete succesfully')
                })
            return itemRemove
        }
        else {
            await cart.update({ quantity: quan - 1 })
                .then(() => {
                    console.log('update complete')

                })
            return itemRemove
        }
    }

}

export const foodItem = {
    getFoodItem: async () => {
        const list = []
        await firestore()
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
        await firestore()
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