// pages/TvDetail.jsx
function TvDetail({ tvId }) {
  const [season, setSeason] = useState(1);
  const [episode, setEpisode] = useState(1);

  return (
    <div>
      <h1>Nombre de la serie</h1>
      
      <div className="episode-selector">
        <select value={season} onChange={(e) => setSeason(e.target.value)}>
          {[1,2,3,4,5].map(s => <option key={s} value={s}>Temporada {s}</option>)}
        </select>
        
        <select value={episode} onChange={(e) => setEpisode(e.target.value)}>
          {[1,2,3,4,5,6,7,8,9,10].map(e => <option key={e} value={e}>Episodio {e}</option>)}
        </select>
      </div>

      <VidlinkPlayer 
        contentId={tvId} 
        type="tv"
        season={season}
        episode={episode}
      />
    </div>
  );
}

export default TvDetail;