import React, { createContext, useContext, useState } from "react";

const ShopContext = createContext();

export const StateContext = ({ children }) => {
	//Add data for our state
	const [showCart, setShowCart] = useState(false);
	const [cartItems, setCartItems] = useState([]);
	const [qty, setQty] = useState(1);
	const [totalQuantities, setTotalQuantities] = useState(0);
	const [totalPrice, setTotalPrice] = useState(0);

	//Increase product quantity
	const increaseQty = () => {
		setQty((prevQty) => prevQty + 1);
	};
	//Decrease product quantity
	const decreaseQty = () => {
		setQty((prevQty) => {
			if (prevQty - 1 < 1) return 1;
			return prevQty - 1;
		});
	};

	//Add product to cart
	const onAdd = (product, quantity) => {
		//Increase total quantity
		setTotalQuantities((prevTotal) => prevTotal + quantity);
		//Increase total price
		setTotalPrice((prevPrice) => prevPrice + product.price * quantity);
		//Check if the product is already in the cart
		const exist = cartItems.find((item) => item.slug === product.slug);
		if (exist) {
			setCartItems(
				cartItems.map((item) =>
					item.slug === product.slug
						? { ...exist, quantity: exist.quantity + quantity }
						: item
				)
			);
		} else {
			setCartItems([...cartItems, { ...product, quantity: quantity }]);
		}
		setQty(1);
	};

	//Remove Product
	const onRemove = (product) => {
		//Decrease total quantity
		setTotalQuantities((prevTotal) => prevTotal - 1);
		//Decrease total price
		setTotalPrice((prevPrice) => prevPrice - product.price);
		const exist = cartItems.find((item) => item.slug === product.slug);
		if (exist.quantity === 1) {
			setCartItems(cartItems.filter((item) => item.slug !== product.slug));
		} else {
			setCartItems(
				cartItems.map((item) =>
					item.slug === product.slug
						? { ...exist, quantity: exist.quantity - 1 }
						: item
				)
			);
		}
	};
	return (
		<ShopContext.Provider
			value={{
				qty,
				increaseQty,
				decreaseQty,
				showCart,
				setShowCart,
				cartItems,
				setCartItems,
				onAdd,
				onRemove,
				totalQuantities,
				totalPrice,
				setQty,
			}}
		>
			{children}
		</ShopContext.Provider>
	);
};

export const useStateContext = () => useContext(ShopContext);
