import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Plyr from 'plyr';
import 'plyr/dist/plyr.css';
import './CustomStreamPlayer.css';

const CustomStreamPlayer = ({ 
  contentId, 
  contentType = 'movie', 
  season = 1, 
  episode = 1 
}) => {
  const [embedUrl, setEmbedUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [volume, setVolume] = useState(1);
  const playerRef = useRef(null);
  const iframeRef = useRef(null);

  // Fetch de la URL del iframe
  useEffect(() => {
    fetchStreamUrl();
  }, [contentId, contentType, season, episode]);

  const fetchStreamUrl = async () => {
    try {
      setLoading(true);
      setError(null);

      let endpoint = '';

      if (contentType === 'movie') {
        endpoint = `/api/vidlink/movie/${contentId}`;
      } else if (contentType === 'tv') {
        endpoint = `/api/vidlink/tv/${contentId}?season=${season}&episode=${episode}`;
      } else if (contentType === 'anime') {
        endpoint = `/api/vidlink/anime/${contentId}?number=${episode}&type=sub`;
      }

      const response = await axios.get(endpoint);
      setEmbedUrl(response.data.embedUrl);
    } catch (err) {
      setError(err.response?.data?.error || 'Error al cargar el reproductor');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Manejo de fullscreen
  const handleFullscreen = () => {
    if (playerRef.current) {
      if (playerRef.current.requestFullscreen) {
        playerRef.current.requestFullscreen();
      } else if (playerRef.current.webkitRequestFullscreen) {
        playerRef.current.webkitRequestFullscreen();
      }
      setIsFullscreen(true);
    }
  };

  // Salir de fullscreen
  const handleExitFullscreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    }
    setIsFullscreen(false);
  };

  if (loading) {
    return (
      <div className="player-container loading">
        <div className="spinner">
          <div className="spinner-circle"></div>
          <p>Cargando reproductor...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="player-container error">
        <div className="error-message">
          <span className="error-icon">⚠️</span>
          <div>
            <h3>Error al cargar el reproductor</h3>
            <p>{error}</p>
            <button onClick={() => fetchStreamUrl()}>Reintentar</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="player-container" ref={playerRef}>
      <div className="player-wrapper">
        {/* Controles personalizados */}
        <div className="player-controls-top">
          <div className="controls-left">
            <span className="player-title">Reproduciendo contenido</span>
          </div>
          <div className="controls-right">
            <button 
              className="control-btn volume-btn" 
              title="Volumen"
              onClick={(e) => {
                const newVolume = volume === 0 ? 1 : 0;
                setVolume(newVolume);
              }}
            >
              {volume === 0 ? '🔇' : '🔊'}
            </button>
            <button 
              className="control-btn fullscreen-btn" 
              title="Pantalla completa"
              onClick={handleFullscreen}
            >
              ⛶
            </button>
          </div>
        </div>

        {/* iframe de Vidlink */}
        <iframe
          ref={iframeRef}
          src={embedUrl}
          width="100%"
          height="100%"
          frameBorder="0"
          allowFullScreen
          title="Reproductor de streaming"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
          className="player-iframe"
        />

        {/* Indicador de que hay ads */}
        <div className="ads-notice">
          <span>ⓘ Este reproductor puede contener anuncios</span>
        </div>
      </div>
    </div>
  );
};

export default CustomStreamPlayer;