
import firestore from '@react-native-firebase/firestore';
import Geocoder from 'react-native-geocoding';
import { objectIsNull, showToast } from '../../../utils/function';

export async function getFirestoreUser(action) {
    // console.log('im running firestore', user)
    const userInfo = await firestore().collection('users').doc(action.data).get().then((doc) => {
        // console.log('doc data', doc.data())
        return {
            ...doc.data(),
            id: doc.id
        }
    });
    return userInfo
}

export const firestoreBranch = {
    getLocationList: async () => {
        const list = []
        await firestore()
            .collection('branch')
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    const data = doc.data()
                    list.push({ ...data, id: doc.id })
                    // console.log(data)
                })
            })
        console.log('list       ', list)

        return list
    }
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
        await firestore()
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
                    rating: itemAdd.rating,
                    image: itemAdd.image,
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
                    const { foodName, catName, price, rating, catId, description, image } = doc.data()
                    list.push({
                        id: doc.id,
                        catId: catId,
                        foodName: foodName,
                        catName: catName,
                        price: price,
                        rating: rating,
                        description: description,
                        image: image
                    })
                })
            })
        return list
    },
    addFoodItem: async (action) => {
        console.log(action.data)
        const dataAdd = action.data
        const data = []
        await firestore()
            .collection('foods')
            .doc('foodDetail')
            .collection('food')
            .add({
                catId: dataAdd.catId,
                catName: dataAdd.catName,
                description: dataAdd.description,
                foodName: dataAdd.foodName,
                price: dataAdd.price,
                rating: 0,
                image: dataAdd.image
            }).then(async (doc) => {
                data.push({
                    id: doc.id,
                    catId: dataAdd.catId,
                    catName: dataAdd.catName,
                    description: dataAdd.description,
                    foodName: dataAdd.foodName,
                    price: dataAdd.price,
                    rating: 0,
                    image: dataAdd.image
                })
                await firestore()
                    .collection('foods')
                    .doc("foodCat")
                    .collection("category")
                    .doc(`${dataAdd.catId}`)
                    .get()
                    .then(async doc => {
                        const { productCount } = doc.data()
                        await firestore()
                            .collection('foods')
                            .doc("foodCat")
                            .collection("category")
                            .doc(`${dataAdd.catId}`).update({
                                productCount: productCount + 1
                            }).then(() => { console.log('+ success') })
                    })
            })

        return data
    },
    addFoodCat: async (action) => {

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
                    const { catName, productCount } = doc.data()
                    listCat.push({
                        id: doc.id,
                        name: catName,
                        count: productCount
                    })
                })
            })
        return listCat
    },
    updateFoodCategoryCount: async (id, isMinus = false) => {
        if (!isMinus) {
            await firestore()
                .collection('foods')
                .doc("foodCat")
                .collection("category")
                .doc(`${id}`)
                .get()
                .then(async doc => {
                    const { productCount } = doc.data()
                    await firestore()
                        .collection('foods')
                        .doc("foodCat")
                        .collection("category")
                        .doc(`${id}`).update({
                            productCount: productCount + 1
                        }).then(() => { console.log('+ success') })
                })

        }
        else {
            await firestore()
                .collection('foods')
                .doc("foodCat")
                .collection("category")
                .doc(`${id}`)
                .get()
                .then(async doc => {
                    const { productCount } = doc.data()
                    await firestore()
                        .collection('foods')
                        .doc("foodCat")
                        .collection("category")
                        .doc(`${id}`).update({
                            productCount: productCount - 1
                        }).then(() => { console.log('- success') })
                })
        }

    }
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
                image: item.image
            })
            .then(() => {
                data.push({
                    id: item.id,
                    foodName: item.foodName,
                    price: item.price,
                    rating: item.rating,
                    catName: item.catName,
                    catId: item.catId,
                    image: item.image
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
                    const { foodName, catName, price, rating, catId, image } = doc.data()
                    list.push({
                        id: doc.id,
                        foodName: foodName,
                        catName: catName,
                        price: price,
                        rating: rating,
                        catId: catId,
                        image: image
                    })
                })
            })
        return list
    }
}
export const order = {
    addOrder: async (action) => {
        const userId = action.data.userId
        const data = action.data.item


    }
}