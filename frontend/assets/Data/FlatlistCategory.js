import { images } from "../style"

const foodList = {
    totalFood: 20,
    foodCategory: [
        {
            id: 1,
            name: 'Foods',
            productCount: 10
        },
        {
            id: 2,
            name: 'Drinks',
            productCount: 9
        },
        {
            id: 3,
            name: 'Vegetarian',
            productCount: 8
        },
        {
            id: 4,
            name: 'Cake',
            productCount: 7

        },
        {
            id: 5,
            name: 'Dessert',
            productCount: 6
        },
        {
            id: 6,
            name: 'Home Made',
            productCount: 5
        },
        {
            id: 7,
            name: 'Street',
            productCount: 4
        }
    ],
    foodDetail: [
        {
            id: 1,
            idType: 1,
            typeName: 'Foods',
            foodName: 'pho1',
            rating: 4.5,
            img: [''],
            price: 90000,
            orderCount: 1,
        },
        {
            id: 2,
            idType: 2,
            typeName: 'Drinks',
            foodName: 'kem2',
            rating: 4.1,
            img: [''],
            price: 10000,
            orderCount: 2,

        }, {
            id: 3,
            idType: 3,
            typeName: 'Vegetarian',
            foodName: 'bun3',
            rating: 3,
            img: [''],
            price: 2000,
            orderCount: 3,
        }, {
            id: 4,
            idType: 4,
            typeName: 'Cake',
            foodName: 'bo vien4',
            rating: 2.4,
            img: [''],
            price: 18000,
            orderCount: 4,
        }, {
            id: 5,
            idType: 5,
            typeName: 'Dessert',
            foodName: 'tai nam5',
            rating: 3.9,
            img: [''],
            price: 20000,
            orderCount: 5,
        }, {
            id: 6,
            idType: 6,
            typeName: 'Home Made',
            foodName: 'banh trang6',
            rating: 1.3,
            img: [''],
            price: 12212,
            orderCount: 6,
        }, {
            id: 7,
            idType: 7,
            typeName: 'Street',
            foodName: 'pho mai7',
            rating: 5.0,
            img: [''],
            price: 42323,
            orderCount: 7,
        },
        {
            id: 8,
            idType: 1,
            typeName: 'Foods',
            foodName: 'pho1',
            rating: 3.1,
            img: [''],
            price: 251233,
            orderCount: 8,
        },
        {
            id: 9,
            idType: 1,
            typeName: 'Foods',
            foodName: 'pho2',
            rating: 2.2,
            img: [''],
            price: 42322,
            orderCount: 10,
        },
        {
            id: 10,
            idType: 1,
            typeName: 'Foods',
            foodName: 'pho2',
            rating: 1.2,
            img: [''],
            price: 21234,
            orderCount: 11,
        },
        {
            id: 11,
            idType: 1,
            typeName: 'Foods',
            foodName: 'pho2',
            rating: 1.7,
            img: [''],
            price: 2312523,
            orderCount: 12,
        },
        {
            id: 13,
            idType: 1,
            typeName: 'Foods',
            foodName: 'pho2',
            rating: 3.8,
            img: [''],
            price: 256112,
            orderCount: 13,
        },

        {
            id: 14,
            idType: 1,
            typeName: 'Foods',
            foodName: 'pho14',
            rating: 1.2,
            img: [''],
            price: 231225,
            orderCount: 14,
        }, {
            id: 15,
            idType: 2,
            typeName: 'Drinks',
            foodName: 'pho14',
            rating: 2.2,
            img: [''],
            price: 73326,
            orderCount: 15,
        }, {
            id: 16,
            idType: 2,
            typeName: 'Drinks',
            resId: 1,
            foodName: 'pho14',
            rating: 3.2,
            img: [''],
            price: 33435,
            orderCount: 16,
        },

    ]
}

// const resdataaa = {
//     restaurantName: "Mc Donalds", farAway: "21.2",
//     businessAddress: "22 Bessie street, Cape Town", images: 'https://bukasapics.s3.us-east-2.amazonaws.com/chicken.png',
//     averageReview: 4.9, numberOfReview: 272, coordinates: { lat: -26.1888612, lng: 28.246325 }, discount: 10, deliveryTime: 15,
//     collectTime: 5, foodType: "Burgers, Wraps,Milkshakes...",
//     productData: [
//         { name: "Hand cut chips", price: 29.30, image: "https://bukasapics.s3.us-east-2.amazonaws.com/plate5.png" },
//         { name: "Big Mac", price: 50.80, image: "https://bukasapics.s3.us-east-2.amazonaws.com/plate4.png" },
//         {
//             name: "Chicken Burger",
//             price: 70, image: "https://bukasapics.s3.us-east-2.amazonaws.com/plate3.png"
//         },
//     ],
//     id: 0
// },

const resLocation = [
    {
        "name": "Di An Stadium",
        "address": "Sân vận động dĩ an, Đông Hoà, Dĩ An, Bình Dương, Vietnam",
        "coords": {
            "latitude": 10.902396240025233,
            "longitude":  106.77875953517312
        },
        "image_url": "https://media.glassdoor.com/l/de/cd/ae/b6/the-face-shop.jpg",
        "description":"Est deserunt id laborum dolore nisi nisi."
    },
    {
        "name": "Giao Toan Noodles",
        "address": "218 Quốc lộ 1K, Linh Xuân, Thủ Đức, Thành phố Hồ Chí Minh, Vietnam",
        "coords": {
            "latitude": 10.884222509031938, 
            "longitude": 106.76999353358718,
        },
        "description":"Ea excepteur est esse dolor aliqua qui velit et qui sint tempor incididunt exercitation officia.",
        "image_url": "https://top10vietnam.vn/wp-content/uploads/2020/07/7eleven11-03-1.jpg"
    },
    {
        "name": "BỆNH VIỆN HOÀN HẢO 2",
        "address": "1125 TL43, Bình Chiểu, Thủ Đức, Thành phố Hồ Chí Minh, Vietnam",
        "coords": {
            "latitude": 10.891513215628594, 
            "longitude": 106.7301680950292
        },
        "description":"Incididunt irure anim minim dolor.",
        "image_url": "https://image.bnews.vn/MediaUpload/Medium/2021/03/11/image-readtop-2019-1056690-15765620694017151.jpg"
    },
    {
        "name": "Khu Hanh Chinh Thi Xa Di An",
        "address": "Đường số 10, Dĩ An, Bình Dương 820000, Vietnam",
        "coords": {
            "latitude": 10.891745861352044, 
            "longitude": 106.76312052860193
        },
        "description":"Incididunt irure anim minim dolor.",
        "image_url": "https://lh5.googleusercontent.com/p/AF1QipNLtAIbb44mXeTmUFx9pQ9aRBrLGn1q-17YtvpJ=w408-h306-k-no"
    },
    {
        "name": "Di An High School",
        "address": "Dĩ An, Binh Duong, Vietnam",
        "coords": {
            "latitude": 10.911615275655718, 
            "longitude": 106.76833474326787
        },
        "description":"Incididunt irure anim minim dolor.",
        "image_url": "https://lh5.googleusercontent.com/p/AF1QipPrXomONVqgkZg8zPKEwzKaMXsDQcCNgNVvk4rN=w408-h306-k-no"
    },
]

const listSelection = [
    {
        id: 1,
        idType: 1,
        typeName: 'Foods',
        name: 'pho1',
        rating: 4.5
    },
    {
        id: 2,
        idType: 2,
        typeName: 'Drinks',
        name: 'kem2',
        rating: 4.1
    }, {
        id: 3,
        idType: 3,
        typeName: 'Vegetarian',
        name: 'bun3',
        rating: 3
    }, {
        id: 4,
        idType: 4,
        typeName: 'Cake',
        name: 'bo vien4',
        rating: 2.4
    }, {
        id: 5,
        idType: 5,
        typeName: 'Dessert',
        name: 'tai nam5',
        rating: 3.9
    }, {
        id: 6,
        idType: 6,
        typeName: 'Home Made',
        name: 'banh trang6',
        rating: 1.3
    }, {
        id: 7,
        idType: 7,
        typeName: 'Street',
        name: 'pho mai7',
        rating: 5.0
    },
    {
        id: 8,
        idType: 1,
        typeName: 'Foods',
        name: 'pho1',
        rating: 3.1
    },
    {
        id: 9,
        idType: 1,
        typeName: 'Foods',
        name: 'pho2',
        rating: 2.2
    },
    {
        id: 10,
        idType: 1,
        typeName: 'Foods',
        name: 'pho2',
        rating: 1.2
    },
    {
        id: 11,
        idType: 1,
        typeName: 'Foods',
        name: 'pho2',
        rating: 1.7
    },
    {
        id: 13,
        idType: 1,
        typeName: 'Foods',
        name: 'pho2',
        rating: 3.8
    },

    {
        id: 14,
        idType: 1,
        typeName: 'Foods',
        name: 'pho14',
        rating: 1.2
    }, {
        id: 15,
        idType: 2,
        typeName: 'Drinks',
        name: 'pho14',
        rating: 2.2
    }, {
        id: 16,
        idType: 2,
        typeName: 'Drinks',
        resId: 1,
        name: 'pho14',
        rating: 3.2
    },

]

const restaurantList = [
    {
        id: 1,
        name: 'Nam Vang',
        address: 'Di An Binh Duong',
    },
    {
        id: 2,
        name: 'Nam Vang 2',
        address: 'Di An Binh Duong 1',
    },
    {
        id: 3,
        name: 'Nam Vang 3',
        address: 'Di An Binh Duong 2 ',
    },
    {
        id: 4,
        name: 'Nam Vang 4',
        address: 'Di An Binh Duong3',
    },

]

export { restaurantList, listSelection, foodList, resLocation }