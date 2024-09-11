const express = require('express');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const User = require('./model/user');
var cors = require('cors');

mongoose.connect('mongodb://localhost/eTrgovina')

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
	res.send('success');
})

app.post('/signin', async (req, res) => {
	const { email, password: plainTextPassword } = req.body;

	if (!email) {
		return res.json({ status: 'error', error: 'Invalid email'})
	}

	if (!plainTextPassword) {
		return res.json({ status: 'error', error: 'Invalid password'})
	}

	try {
		const response = await User.findOne({ email: email});

		const isValid = bcrypt.compareSync(plainTextPassword, response.password);

		if (isValid) {
			return res.json({ status: 'ok'})
		} else {
			return res.json({ status: 'error', error: 'Incorrect password' });
		}
	} catch (error) {
			return res.json({ status: 'error', error: 'Error logging in' });
	}

})

app.post('/register', async (req, res) => {
	const { name, email, password: plainTextPassword } = req.body;

	if (!email) {
		return res.json({ status: 'error', error: 'Invalid email'})
	}

	if (!plainTextPassword) {
		return res.json({ status: 'error', error: 'Invalid password'})
	}

	const password = await bcrypt.hash(plainTextPassword, 10);

	try {
		const response = await User.create({
			name,
			email,
			password
		})
		console.log('User created successfully: ', response);
	} catch (error) {
		if (error.code === 11000) {
			return res.json({ status: 'error', error: 'Email already in use' });
		}
		throw error
	}

	res.json({ status: 'ok'})
})

app.listen(3002, () => {
	console.log('app is running on port 3002');
})
