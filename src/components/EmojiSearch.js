import React, { Component } from 'react';
import './App.css';

class EmojiSearch extends Component {
	constructor() {
		super();
		this.state = {
			error: null,
			isLoaded: false,
			items: [],
			toBeDisplay: []
		};
	}

	componentDidMount() {
		fetch(
			`https://emoji-api.com/emojis?access_key=${process.env.REACT_APP_ACCESS_KEY}`
		)
			.then((res) => res.json())
			.then(
				(result) => {
					this.setState({
						isLoaded: true,
						items: result,
						toBeDisplay: result
					});
				},

				(error) => {
					this.setState({
						isLoaded: true,
						error
					});
				}
			);
	}

	searchEmoji(event) {
		console.log(event.target.value);

		let found = [];
		this.state.items.forEach((i) => {
			let props = 0;
			// Take a look at each property in the object
			for (let prop in i) {
				// Check if property value contains search
				if (i[prop].indexOf(event.target.value.toLowerCase()) > -1) {
					props++;
				}
			}
			// If the search query was found in any properties
			if (props >= 1) {
				found.push(i);
			}
		});

		this.setState({
			toBeDisplay: found
		});
	}

	render() {
		const { error, isLoaded, toBeDisplay } = this.state;
		if (error) {
			return <div>Error: {error.message}</div>;
		} else if (!isLoaded) {
			return <div>Loading...</div>;
		} else {
			return (
				<div id="container">
					<h3>Emoji Search</h3>
					<input
						name="emoji"
						type="text"
						id="myInput"
						placeholder="Search an emoji"
						onChange={(event) => this.searchEmoji(event)}
					/>

					<ul id="myUL">
						{toBeDisplay.map((item) => (
							<li key={item.codePoint}>{item.character}</li>
						))}
					</ul>
				</div>
			);
		}
	}
}

export default EmojiSearch;
