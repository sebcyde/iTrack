import React, { useState } from 'react';

type Item = string;

interface WatchlistProps {
	// You can add any additional props here, if needed
}

const Watchlist: React.FC<WatchlistProps> = () => {
	// Use the useState hook to create a state variable called "items"
	// and a function called "setItems" to update the value of "items"
	const [items, setItems] = useState<Item[]>([]);

	// Define a function to add a new item to the watchlist
	const addItem = (item: Item) => {
		// Get a reference to the watchlist document in your Cloud Firestore database
		const watchlistRef = firestore().doc(
			'/Users/8RYrdNm65GTq5J6rhzbpbNZArnn1/StockLists/AllLists/watchlist'
		);
		// Update the watchlist by adding the new item to the list
		watchlistRef.update({
			watchlist: firestore.FieldValue.arrayUnion(item),
		});
	};

	// Define a function to remove an item from the watchlist
	const removeItem = (item: Item) => {
		// Get a reference to the watchlist document in your Cloud Firestore database
		const watchlistRef = firestore().doc(
			'/Users/8RYrdNm65GTq5J6rhzbpbNZArnn1/StockLists/AllLists/watchlist'
		);
		// Update the watchlist by removing the item from the list
		watchlistRef.update({
			watchlist: firestore.FieldValue.arrayRemove(item),
		});
	};

	return (
		<div>
			<h1>Watchlist</h1>
			{/* Render the list of items */}
			<ul>
				{items.map((item) => (
					<li key={item}>
						{item}
						{/* Add a button to remove the item from the watchlist */}
						<button onClick={() => removeItem(item)}>Remove</button>
					</li>
				))}
			</ul>
			{/* Add a form to allow the user to add a new item to the watchlist */}
			<form
				onSubmit={(event) => {
					// Prevent the form from submitting
					event.preventDefault();
					// Get the value of the "item" input field
					const input = event.currentTarget.elements
						.item as unknown as HTMLInputElement;
					// Add the new item to the watchlist
					addItem(input.value);
					// Clear the value of the input field
					input.value = '';
				}}
			>
				<label>
					Add item:
					<input name="item" type="text" />
				</label>
				<button type="submit">Add</button>
			</form>
		</div>
	);
};

export default Watchlist;
function firestore() {
  throw new Error('Function not implemented.');
}

