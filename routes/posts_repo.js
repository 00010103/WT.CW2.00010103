const fs = require('fs')

class PostsRepository {
	// constructor 
	constructor(){
		this.postsDb = []

		fs.readFile('./data/posts.json', (err, data) => { //connection to the data  
			if (!err) {
				this.postsDb = JSON.parse(data)
			}
		})
	}
    //add post 
	add(post, callback) {
		post.id = this.generateRandomId()// generates the id 
		this.postsDb.push(post)
		
		this.updateFile(callback)// updates the data array file 
	}
    // get all data
	getAllData() {
		return this.postsDb.filter(post => !post.archived)
	}
    
	getById(id) {
		return this.postsDb.find(post => post.id === id)
	}
    // deletion code part 
	delete(id, callback) {
		const index = this.postsDb.findIndex(post => post.id === id)

		// Delete from postsDB array
		this.postsDb.splice(index, 1)

		// Updates posts.json file (calls the updateFile function)
		this.updateFile(callback)
	}
    // random id generator 
	generateRandomId() {
		return Math.floor(Math.random() * 99999999999) + 1
	}
    // Update data function 
	updateFile(callback){
		fs.writeFile('./data/posts.json', JSON.stringify(this.postsDb), callback)
	}
}

module.exports.PostsRepository = PostsRepository 