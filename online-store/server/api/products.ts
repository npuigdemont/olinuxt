import { getFirestore } from 'firebase-admin/firestore'
import { initializeApp, getApps, cert } from 'firebase-admin/app'

const apps = getApps()

if (!apps.length) {
    initializeApp({
        credential: cert('./oil-online-store-firebase-adminsdk-pvnqw-38236e402b.json')
    })
}

export default async (request, response) => {
    const db = getFirestore()
    const productsSnap = await db.collection('products').get()
    const productsData = productsSnap.docs.map(doc => {
        return {
            uuid: doc.id,
            ...doc.data()
        }
    })
    
    return productsData
}