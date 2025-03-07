import DailyInfo from '../../components/UI/WaterUserInfo/DailyInfo/DailyInfo.jsx';
import UserPanel from '../../components/UI/WaterUserPanel/UserPanel/UserPanel.jsx';

const TrackerPage = () => {
  return (
    <div className="container">
      <UserPanel />
      <DailyInfo />
    </div>
  );
};

export default TrackerPage;
