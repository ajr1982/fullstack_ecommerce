import Image from "next/image";
import { ProductStyles } from "../styles/ProductStyles";
import Link from "next/link";

export default function Product({ product }) {
	const { title, price, image, slug } = product.attributes;
	return (
		<ProductStyles>
			<Link href={`/product/${slug}`}>
				<div>
					<div>
						<img src={image.data.attributes.formats.small.url} alt={title} />
					</div>

					<h2>{title}</h2>
					<h3>&euro;{price}</h3>
				</div>
			</Link>
		</ProductStyles>
	);
}
