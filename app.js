const fs = require('fs')
const express = require('express')
const app = express()

app.use('/static', express.static('public'))

app.set('view engine', 'pug')
app.use(express.urlencoded({ extended: false}))
app.get('/', (req, res) => {
	res.render('home')
})

app.get('/create', (req, res) => {
	res.render('create')
})

app.post('/create', (req, res) => {

	const title = req.body.title
	const desc = req.body.desc

	if (title.trim() !== '' && desc.trim() !== '') {

		fs.readFile('./Data/notes.json', (err, data) => {
			if (err) throw err

			const notes = JSON.parse(data)

		    notes.push({
		    	id: id(),
		    	title: title,
		    	description: desc
		    })

		    fs.writeFile('./Data/notes.json', JSON.stringify(notes), err => {
		    	if (err) throw err

		        res.render('create', { success: true })
		    })

		})

	} else {
		res.render('create', { error: true })
	}
})


app.get('/notes', (req, res)=> {
	fs.readFile('./Data/notes.json', (err, data) =>  {
        const notes =JSON.parse(data)
		res.render('notes', { notes: notes})
	})
})


app.get('/notes/:id', (req, res) =>{
	const id = req.params.id

	fs.readFile('./Data/notes.json', (err, data) =>  {
        const notes =JSON.parse(data)

        const note = notes.filter(note => note.id == id)[0]



		res.render('detail', { note: note})
	})	
})

app.get('/notes/:id/delete', (req,res) => {
	const id = req.params.id

	fs.readFile('./Data/notes.json', (err,data) => {
		if (err) throw err
		
		const notes = JSON.parse(data)

	    const filteredNotes = notes.filter(note => note.id !== id)

	    console.log(filteredNotes)

	    fs.writeFile('./Data/notes.json', JSON.stringify(filteredNotes), err => {
	    	if (err) throw err
	    	res.render('notes', { id: id, notes: filteredNotes })
	    })
	})
})


app.listen(8000, err => {
	if(err) throw err
	
	console.log('App is running...')
})


function id () {
  // Math.random should be unique because of its seeding algorithm.
  // Convert it to base 36 (numbers + letters), and grab the first 9 characters
  // after the decimal.
  return '_' + Math.random().toString(36).substr(2, 9);
}
