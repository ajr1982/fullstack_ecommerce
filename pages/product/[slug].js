import { useQuery } from "urql";
import { GET_PRODUCT_QUERY } from "../../lib/query";
import { useRouter } from "next/router";
import {
	ProductDetailStyles,
	ProductInfo,
	Quantity,
	Buy,
} from "../../styles/ProductDetailStyles";
import { AiFillPlusCircle, AiFillMinusCircle } from "react-icons/ai";
import { useStateContext } from "../../lib/context";
import { useEffect } from "react";

export default function ProductDetails() {
	//Use State
	const { qty, increaseQty, decreaseQty, onAdd, setQty } = useStateContext();

	//Reset QTY
	useEffect(() => {
		setQty(1);
	}, []);
	//Fetch Slug
	const { query } = useRouter();
	//Fetch GraphQl data
	const [results] = useQuery({
		query: GET_PRODUCT_QUERY,
		variables: { slug: query.slug },
	});
	const { data, fetching, error } = results;
	// Check for the data coming in
	if (fetching) return <p>Loading...</p>;
	if (error) return <p>An error ocurred: {error.message}</p>;

	const { title, description, price, image } = data.products.data[0].attributes;

	return (
		<ProductDetailStyles>
			<img src={image.data.attributes.formats.medium.url} alt={title} />
			<ProductInfo>
				<h3>{title}</h3>
				<p>{description}</p>
				<p>&euro;{price}</p>
				<Quantity>
					<span>Quantity</span>
					<button onClick={decreaseQty}>
						<AiFillMinusCircle />
					</button>
					<p>{qty}</p>
					<button onClick={increaseQty}>
						<AiFillPlusCircle />
					</button>
				</Quantity>
				<Buy onClick={() => onAdd(data.products.data[0].attributes, qty)}>
					Add to cart
				</Buy>
			</ProductInfo>
		</ProductDetailStyles>
	);
}
