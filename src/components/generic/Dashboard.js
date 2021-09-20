import { connect } from 'react-redux';
import HeaderTitle from '../generic/HeaderTitle';
import cookie from 'js-cookie';

const Dashboard = ({ title, isAuthUser }) => {
  const user = cookie.get('user');
  return (
    <div>
      <HeaderTitle title={title} />
      {isAuthUser && (
        <div>
          <h1>اطلاعات کاربری شما :</h1>
          <p>نام کاربری : {user}</p>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = ({ isAuthUser }) => ({
  isAuthUser,
});

export default connect(mapStateToProps)(Dashboard);
