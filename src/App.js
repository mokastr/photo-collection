import React from 'react'
import { useState, useEffect } from 'react'
import { Collection } from './Collection'
import './index.scss'

const cats = [
	{ name: 'Все' },
	{ name: 'Море' },
	{ name: 'Горы' },
	{ name: 'Архитектура' },
	{ name: 'Города' },
]

function App() {
	const [collections, setCollections] = useState([])
	const [searchValue, setSearchValue] = useState('')
	const [categoryId, setCategoryId] = useState(0)
	const [isLoading, setIsLoading] = useState(true)
	const [page, setPage] = useState(1)
	useEffect(() => {
		setIsLoading(true)

		const category = `${categoryId ? `category=${categoryId}` : ''}`

		const pageParams = `page=${page}`

		fetch(
			`https://64182e9275be53f451d80d40.mockapi.io/photo_collection?${pageParams}&limit=5&${category}`
		)
			.then(res => res.json())
			.then(json => {
				return setCollections(json)
			})
			.catch(err => console.warn(err))
			.finally(() => setIsLoading(false))
	}, [categoryId, page])

	return (
		<div className="App">
			<h1>Моя коллекция фотографий</h1>
			<div className="top">
				<ul className="tags">
					{cats.map((obj, index) => (
						<li
							onClick={() => setCategoryId(index)}
							className={categoryId === index ? 'active' : ''}
							key={obj.name}
						>
							{obj.name}
						</li>
					))}
				</ul>
				<input
					value={searchValue}
					onChange={e => setSearchValue(e.target.value)}
					className="search-input"
					placeholder="Поиск по названию"
				/>
			</div>
			<div className="content">
				{isLoading ? (
					<h2>Идет загрузка ...</h2>
				) : (
					collections
						.filter(obj => {
							return obj.name.toLowerCase().includes(searchValue.toLowerCase())
						})
						.map((obj, index) => (
							<Collection key={index} name={obj.name} images={obj.photos} />
						))
				)}
			</div>
			<ul className="pagination">
				{[...Array(5)].map((_, i) => (
					<li
						onClick={() => setPage(i + 1)}
						className={page === i + 1 ? 'active' : ''}
					>
						{i + 1}
					</li>
				))}
			</ul>
		</div>
	)
}

export default App
