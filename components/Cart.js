import { useStateContext } from "../lib/context";
import {
	CartWrapper,
	CartStyle,
	Card,
	CardInfo,
	EmptyStyle,
	Checkout,
} from "../styles/CartStyles";
import { FaShoppingCart } from "react-icons/fa";
import { AiFillPlusCircle, AiFillMinusCircle } from "react-icons/ai";
import { Quantity } from "../styles/ProductDetailStyles";
import { cartAnim, cardAnim } from "../animation/animation";
import getStripe from "../lib/getStripe";

export default function Cart() {
	const { cartItems, setShowCart, onAdd, onRemove, totalPrice } =
		useStateContext();

	//Payment
	const handleCheckout = async () => {
		const stripe = await getStripe();
		const response = await fetch("/api/stripe", {
			method: "POST",
			headers: { "Content-Type": "application/JSON" },
			body: JSON.stringify(cartItems),
		});
		const data = await response.json();
		await stripe.redirectToCheckout({ sessionId: data.id });
	};

	return (
		<CartWrapper
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			onClick={() => setShowCart(false)}
		>
			<CartStyle
				variants={cartAnim}
				initial="hidden"
				animate="show"
				exit="leave"
				layout
				onClick={(e) => e.stopPropagation()}
			>
				{cartItems.length < 1 && (
					<EmptyStyle variants={cardAnim}>
						<h1>You have no items in your cart.</h1>
						<FaShoppingCart />
					</EmptyStyle>
				)}
				{cartItems.length >= 1 &&
					cartItems.map((item) => {
						return (
							<Card layout variants={cardAnim} key={item.slug}>
								<img
									src={item.image.data.attributes.formats.thumbnail.url}
									alt={item.title}
								/>
								<CardInfo>
									<h3>{item.title}</h3>
									<h3>&euro;{item.price}</h3>
									<Quantity>
										<button onClick={() => onRemove(item)}>
											<AiFillMinusCircle />
										</button>
										<p>{item.quantity}</p>
										<button onClick={() => onAdd(item, 1)}>
											<AiFillPlusCircle />
										</button>
									</Quantity>
								</CardInfo>
							</Card>
						);
					})}
				{cartItems.length >= 1 && (
					<Checkout layout>
						<h3>Subtotal: €{totalPrice.toFixed(2)}</h3>
						<button onClick={handleCheckout}>Purchase</button>
					</Checkout>
				)}
			</CartStyle>
		</CartWrapper>
	);
}
