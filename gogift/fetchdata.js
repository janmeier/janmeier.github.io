const fs = require('fs')

const fetch = require('isomorphic-fetch')
const FormData = require('form-data');


async function main() {
	let data = []

	const categories = [
		457,
		461,
		476,
		150,
		325,
		488,
		470,
		150,
		403,
		150,
		496,
		451,
	]

	for (const category of categories) {
		let page = 0

		do {
			const form = new FormData()
			form.append('shopId',  1)
			form.append('type', 'Physical')
			form.append('categories[0][]', 'null')
			form.append('page', page)

			const result = await fetch("https://www.gogift.com/api/products/filter", {
				"body": form,
				"method": "POST",
			})
			// const result = await fetch(`https://www.gogift.com/api/products/listphysical/1?page=${page}&categoryId=1&sort=Position`)
			page++
			const json = await result.json()

			console.log(json)
			if (json.collection.length === 0) {
				break
			}

			for (const item of json.collection) {
				item.category = category
				data.push(item)
			}
		} while (true)
	}


	fs.writeFileSync('./data.json', JSON.stringify(data))
}
main()
