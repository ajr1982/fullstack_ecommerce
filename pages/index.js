import Head from "next/head";
import { useQuery } from "urql";
import { PRODUCT_QUERY } from "../lib/query";
import Product from "../components/Product";
import { Gallery } from "../styles/Gallery";

export default function Home() {
	//Fetch products from Strapi
	const [results] = useQuery({ query: PRODUCT_QUERY });
	const { data, fetching, error } = results;

	// Check for the data coming in
	if (fetching) return <p>Loading...</p>;
	if (error) return <p>An error ocurred: {error.message}</p>;
	const products = data.products.data;

	return (
		<div>
			<Head>
				<title>Styled.</title>
				<meta name="description" content="You, styled." />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main>
				<Gallery>
					{products.map((product) => (
						<Product key={product.attributes.slug} product={product} />
					))}
				</Gallery>
			</main>
		</div>
	);
}
