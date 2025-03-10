import { useEffect, useState } from 'react';
import ProgressBar from '../../components/ProgressBar/ProgressBar.jsx';

const TrackerPage = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setProgress(65);
  }, []);

  return (
    <>
      <h2>TrackerPage</h2>
      <ProgressBar progress={progress} />
    </>
  );
};

export default TrackerPage;
