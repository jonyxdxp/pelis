import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import './CustomStreamPlayer.css';

const VidlinkPlayer = ({ contentId, type = 'movie', season, episode }) => {
  const [embedUrl, setEmbedUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchEmbedUrl();
  }, [contentId, type, season, episode]);

  const fetchEmbedUrl = async () => {
    try {
      setLoading(true);
      setError(null);

      let response;

      if (type === 'movie') {
        response = await api.getMoviePlayer(contentId);
      } else if (type === 'tv') {
        response = await api.getTvPlayer(contentId, season || 1, episode || 1);
      } else if (type === 'anime') {
        response = await api.getAnimePlayer(contentId, episode || 1, 'sub');
      }

      if (!response.success) {
        throw new Error(response.error || 'Error cargando el reproductor');
      }

      setEmbedUrl(response.embedUrl);
    } catch (err) {
      setError(err.message || 'Error cargando el reproductor');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="player-container">
        <div className="player-loading">
          <div className="spinner"></div>
          <p>Cargando reproductor...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="player-container">
        <div className="player-error">
          <span>⚠️ {error}</span>
          <button onClick={fetchEmbedUrl}>Reintentar</button>
        </div>
      </div>
    );
  }

  return (
    <div className="player-container">
      <iframe
        src={embedUrl}
        width="100%"
        height="600px"
        frameBorder="0"
        allowFullScreen
        title="Reproductor Vidlink"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        style={{
          borderRadius: '8px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
        }}
      />
    </div>
  );
};

export default VidlinkPlayer;