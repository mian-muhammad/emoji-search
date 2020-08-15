import React from 'react';

const List = ({ items }) => {
	return (
		<ul className="flex-container">
			{items.map((item) => (
				<li className="flex-item" key={item.codePoint}>
					{item.character}
				</li>
			))}
		</ul>
	);
};

export default List;
