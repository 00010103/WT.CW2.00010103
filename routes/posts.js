const express = require('express');
const router = express.Router();
const fs = require('fs')

// connects to the data
const DB = './data/posts.json'

router.get('/', (req, res) => {

	fs.readFile(DB, (err, data) => {
		if (err) throw err

		const posts = JSON.parse(data)

		res.render('posts', { posts: posts.length ==0 ? false : posts })
	})
})

;

module.exports = router;