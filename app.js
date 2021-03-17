const express = require('express')
const app = express()

app.use('/static', express.static('public'))

app.set('view engine', 'pug')
app.get('/', (req, res) => {
	res.render('home')
})

app.get('/create-note', (req, res) => {
	res.render('create')
})

app.get('/notes', (req, res)=> {
	res.render('notes', { notes:['First note', 'Second note'] })
})


app.get('/notes/detail', (req, res) =>{
	res.render('detail')
})

app.listen(8000, err => {
	if(err) throw err
		console.log('App is running...')
})
