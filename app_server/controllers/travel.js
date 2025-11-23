const travel = (req, res) => {
  fetch('http://localhost:3000/api/trips')
    .then(response => response.json())
    .then(json => {
      // Validate JSON is correct format
      if (!Array.isArray(json)) {
        return res.status(500).send("API returned invalid format");
      }

      if (json.length === 0) {
        return res.status(404).send("No trips found");
      }

      // Render the travel page using data from API
      res.render('travel', {
        title: 'Travlr Getaways',
        trips: json
      });
    })
    .catch(err => {
      console.error('API error:', err);
      res.status(500).send("Internal Server Error");
    });
};

module.exports = {
  travel
};
