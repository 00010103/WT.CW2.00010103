const express = require('express')
const app = express()
//connects the file with constructor 
const { PostsRepository } = require('./routes/posts_repo')

const parser = require('body-parser')
app.use(express.urlencoded({extended: false}))

app.use('/assets', express.static('./public'))

app.set('view engine', 'pug')

const postsRepo = new PostsRepository()

//routing part 
const posts = require('./routes/posts.js')
app.use('/posts1', posts)

app.get('/', (req, res) => {
	res.render('index')
})

//create post code part 
app.get('/WT.CW2.00010103/create', (req, res) => {
	res.render('create', {show: req.query.success})
})

app.post('/WT.CW2.00010103/create', (req, res) => {
	// get the sent data from input 
	const post = {
		title: req.body.title,
		author: req.body.author,
		body: req.body.details
	}

	postsRepo.add(post, (err) => {
		if (err) {
			res.redirect('/WT.CW2.00010103/create?success=0')
		} else {
			res.redirect('/WT.CW2.00010103/create?success=1')
		}
	})
}) 

app.get('/posts', (req, res) => {
	const posts = postsRepo.getAllData()// get the data from constructor 
	res.render('posts', {posts: posts.length ==0 ? false : posts})
})
//assigns id to an element
app.get('/posts1/:id', (req, res) => {
	const id = parseInt(req.params.id)
	const post = postsRepo.getById(id)

	res.render('post', {post})
})
// Deletion by id part 
app.get('/posts1/:id/delete', (req, res) => {
	const id = parseInt(req.params.id)

	postsRepo.delete(id, (err) => {
		if (err) {
			res.redirect('/posts1?success=0')
		} else {
			res.redirect('/posts1?success=1')
		}
	})
})
// api part
app.get('/api/v1/posts', (req, res) => {
	// Getting all posts from data array 
	const posts = postsRepo.getAllData()

	res.json(posts)
})
// host
app.listen(8060, () => console.log('App is running on server http://localhost:8060/'))







