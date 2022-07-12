//Shopping Cart Animation Variants
export const cartAnim = {
	hidden: { x: "50%" },
	show: {
		x: "0%",
		transition: {
			type: "tween",
			delayChildren: 0.2,
			staggerChildren: 0.1,
		},
	},
	leave: {
		x: "50%",
		transition: {
			type: "tween",
		},
	},
};
export const cardAnim = {
	hidden: { opacity: 0, scale: 0.8 },
	show: { opacity: 1, scale: 1 },
};
