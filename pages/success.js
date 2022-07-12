import { useRouter } from "next/router";
import styled from "styled-components";

const stripe = require("stripe")(
	`${process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY}`
);

export async function getServerSideProps(params) {
	const order = await stripe.checkout.sessions.retrieve(
		params.query.session_id,
		{
			expand: ["line_items"],
		}
	);
	return { props: { order } };
}

export default function Success({ order }) {
	const route = useRouter();
	return (
		<SuccessStyle>
			<div>
				<h1>Thank you for your order!</h1>
				<h2>
					A confirmation address has been sent to {order.customer_details.email}
				</h2>

				<h3>Address</h3>
				{/* {Object.entries(order.customer_details.address).map(([key, val]) => (
						<p key={key}>
							{key}:{val}
						</p>
					))} */}
				<p>{order.customer_details.address.line1}</p>
				<p>{order.customer_details.address.line2}</p>
				<p>{order.customer_details.address.city}</p>
				<p>{order.customer_details.address.state}</p>
				<p>{order.customer_details.address.postal_code}</p>
				<p>{order.customer_details.address.country}</p>

				<h3>Products</h3>
				{order.line_items.data.map((item) => (
					<div key={item.id}>
						<p>Product: {item.description}</p>
						<p>Quantity: {item.quantity}</p>
						<p>Price: {item.price.unit_amount / 100}</p>
					</div>
				))}
				<button onClick={() => route.push("/")}>Continue Shopping</button>
			</div>
		</SuccessStyle>
	);
}

const SuccessStyle = styled.div`
	width: 60%;
	margin: 0 auto;
	padding: 2rem;
	background: white;
	border-radius: 20px;

	div {
		margin: 2rem 0rem;
	}
	h1 {
		margin: 2rem 0rem;
		text-align: center;
	}
	h2,
	h3 {
		margin: 1rem 0rem;
	}
	button {
		color: white;
		background: var(--primary);
		border: none;
		font-size: 1.2rem;
		font-weight: 500;
		padding: 1rem 2rem;
		cursor: pointer;
		width: 40%;
		margin: 0 auto;
		display: block;
	}
`;
