// pages/SeriesDetail.jsx
import React, { useState, useEffect } from 'react';
import CustomStreamPlayer from '../components/CustomStreamPlayer';

function SeriesDetail({ seriesId }) {
  const [series, setSeries] = useState(null);
  const [season, setSeason] = useState(1);
  const [episode, setEpisode] = useState(1);
  const [episodes, setEpisodes] = useState([]);

  useEffect(() => {
    fetchSeries();
  }, [seriesId]);

  useEffect(() => {
    fetchEpisodes(season);
  }, [season]);

  const fetchSeries = async () => {
    try {
      const response = await axios.get(`/api/series/${seriesId}`);
      setSeries(response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const fetchEpisodes = async (seasonNum) => {
    try {
      const response = await axios.get(`/api/series/${seriesId}/episodes?season=${seasonNum}`);
      setEpisodes(response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  if (!series) return <div>Cargando...</div>;

  return (
    <div className="series-detail">
      <h1>{series.title}</h1>

      {/* Reproductor personalizado */}
      <CustomStreamPlayer
        contentId={seriesId}
        contentType="tv"
        season={season}
        episode={episode}
      />

      {/* Selectores de temporada y episodio */}
      <div className="episode-selector">
        <div className="season-selector">
          <label>Temporada:</label>
          <select value={season} onChange={(e) => setSeason(e.target.value)}>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(s => (
              <option key={s} value={s}>Temporada {s}</option>
            ))}
          </select>
        </div>

        <div className="episode-selector">
          <label>Episodio:</label>
          <select value={episode} onChange={(e) => setEpisode(e.target.value)}>
            {episodes.map(ep => (
              <option key={ep.number} value={ep.number}>
                Episodio {ep.number}: {ep.title}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}

export default SeriesDetail;