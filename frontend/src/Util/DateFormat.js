import Moment from 'react-moment';
import 'moment/locale/ko';

export function DateFormat(date) {
  const nowTime = new Date();
  const createTime = new Date(date);
  if (nowTime - createTime < 86400000) {
    return (
      <Moment fromNow>{date}</Moment>
    )
  } else {
    return (
      <Moment format="YY.MM.DD">{date}</Moment>
    )
  };
};