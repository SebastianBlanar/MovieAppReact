import { createContext, useState, useEffect, useContext } from 'react';
import { db } from '../main';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useAuth0 } from '@auth0/auth0-react';

export const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
    const { user, isAuthenticated } = useAuth0();
    const [wishlist, setWishlist] = useState([]);

    const userId = user ? user.sub : null;

    useEffect(() => {
        const saveWishlist = async () => {
            if (!userId) return;
            const wishlistDoc = doc(db, "wishlists", userId);
            try {
                await setDoc(wishlistDoc, { wishlist });
            } catch (e) {
                console.error("Error updating the wishlist:", e);
            }
        };

        if (wishlist.length) {
            saveWishlist();
        }
    }, [wishlist, userId]);

    const loadWishlist = async (userId) => {
        try {
            const docRef = doc(db, "wishlists", userId);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                setWishlist(docSnap.data().wishlist);
            } else {
                console.log("No wishlist found for this user.");
            }
        } catch (error) {
            console.error("Error loading wishlist: ", error);
        }
    };

    const addContentToWishlist = (content) => {
        if (wishlist.some(c => c.id == content.id)) return;
        const updatedWishlist = [...wishlist, content];
        console.log("Updated wishlist:", updatedWishlist); // Para verificar
        setWishlist(updatedWishlist);
    };

    const removeContentFromWishlist = (contentId) => {
        const filteredWishlist = wishlist.filter(c => c.id != contentId);
        console.log("Updated wishlist:", filteredWishlist); // Para verificar
        setWishlist(filteredWishlist);
    };    

    useEffect(() => {
        if (isAuthenticated && userId) {
            loadWishlist(userId);
        }
    }, [isAuthenticated, userId]);

    return (
        <WishlistContext.Provider value={{ wishlist, addContentToWishlist, removeContentFromWishlist }}>
            {children}
        </WishlistContext.Provider>
    );
};

export const useWishlist = () => useContext(WishlistContext);
