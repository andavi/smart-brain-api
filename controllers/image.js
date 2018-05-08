const Clarifai = require('clarifai');

const app = new Clarifai.App({
 apiKey: 'e0b0295af1b74d81be3ba345f2d743c3'
});

const handleApiCall = (req, res) => {
	app.models
      .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
      .then(data => {
      	res.json(data);
      })
      .catch(err => res.status(400).json('Unable to access Claifai API'));
  }

const handleImage = (req, res, db) => {
	const { id } = req.body;
	db('users').where('id', '=', id)
		.increment('entries', 1)
		.returning('entries')
		.then(entries => {
			res.json(entries[0]);
		})
		.catch(err => res.status(400).json('Unable to get entries'));
}

module.exports = {
	handleImage,
	handleApiCall
}