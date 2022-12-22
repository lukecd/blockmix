import React, { useState, useEffect } from "react";

const SearchQueries = ({ doSearch }) => {
	const [searchQueries, setSearchQueries] = useState([]);

	const shuffleQueries = () => {
		const baseQueries = [
			"house",
			"ambient",
			"pop",
			"folk",
			"disco",
			"jazz",
			"hip hop",
			"trap",
			"experimental",
			"lofi",
			"metal",
			"electronic",
			"punk",
			"world",
			"classical",
			"country",
			"latin",
			"hyperpop",
			"house",
			"tropical house",
			"moombahton",
			"trending",
		];
		// randomize the list and then only show the first 12
		for (var i = baseQueries.length - 1; i > 0; i--) {
			var j = Math.floor(Math.random() * (i + 1));
			var temp = baseQueries[i];
			baseQueries[i] = baseQueries[j];
			baseQueries[j] = temp;
		}
		setSearchQueries(baseQueries.slice(0, 12));
	};

	useEffect(() => {
		// shuffle the queries to give our UI some randomness
		shuffleQueries();
	}, []);

	return (
		<div className="border bg-secondary border-primary border-8 mx-20 mt-5">
			<div>
				<div className="flex flex-row items-center pr-10">
					{searchQueries.map((query, id) => (
						<div className="px-1" key={id}>
							<button
								type="button"
								className="font-mono mt-3 mb-3 rounded border border-gray-300 bg-white px-2.5 py-1.5 text-xs font-medium text-text shadow-sm hover:bg-highlight focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
								onClick={(e) => {
									doSearch(query);
								}}
							>
								{query}
							</button>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default SearchQueries;
