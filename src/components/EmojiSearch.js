import React, { Component } from 'react';
import './App.css';
import emojis from './emojis.json';
import List from './List';

class EmojiSearch extends Component {
	constructor() {
		super();
		this.state = {
			items: emojis,
			toBeDisplay: emojis
		};
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
		const { toBeDisplay } = this.state;

		return (
			<div id="container">
				<h3 className="item">Emoji Search</h3>
				<input
					name="emoji"
					className="item"
					type="text"
					id="myInput"
					placeholder="Search an emoji"
					onChange={(event) => this.searchEmoji(event)}
				/>

				<List items={toBeDisplay} />
			</div>
		);
	}
}

export default EmojiSearch;
