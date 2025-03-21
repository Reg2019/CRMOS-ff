export default {
	activeOrderHistory: {},
	setActiveOrderHistory: (orderHistory) => {
		this.activeOrderHistory = orderHistory;
	},
	totalRefund () {
		const items = fetch_order_details.data;
		let totalPrice = 0;

		for (const item of items) {
			const { quantity, price } = item;
			totalPrice += quantity * price;
		}

		return totalPrice;
	},
}