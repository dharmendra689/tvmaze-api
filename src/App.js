import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useParams } from 'react-router-dom';
import axios from 'axios';
import "./App.css"

function App() {
  const [shows, setShows] = useState([]);

  useEffect(() => {
    axios.get('https://api.tvmaze.com/search/shows?q=all')
      .then(response => {
        setShows(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div className="tv">
      <h1>TV Shows</h1>
      <Router>
        <div className="shows">
          {shows.map(show => (
            <div key={show.show.id}>
              <Link to={`/summary/${show.show.id}`}>
                <img className="show-image" src={show.show.image?.medium} alt={show.show.name} />
                {show.show.name}
              </Link>
            </div>
          ))}
        </div>
        <Routes>
          <Route path="/summary/:id" element={<ShowSummary />} />
        </Routes>
      </Router>
    </div>
  );
}

function ShowSummary() {
  const [summary, setSummary] = useState('');

  let { id } = useParams();
  
  useEffect(() => {
    axios.get(`https://api.tvmaze.com/shows/${id}`)
      .then(response => {
        setSummary(response.data.summary);
      })
      .catch(error => {
        console.error('Error fetching show summary:', error);
      });
  }, [id]);

  return (
    <>
      {summary}
      </>
  );
}

export default App;
