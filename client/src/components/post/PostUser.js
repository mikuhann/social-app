import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { Link } from "react-router-dom";

const PostUser = ({ post: { text, avatar, user, name, date } }) => {
  return (
    <div className='post bg-white p-1 my-1'>
      <div>
        <Link to={`/profile/${user}`}>
          <img className='round-img' src={ avatar } alt="Avatar"/>
          <h4>{ name }</h4>
        </Link>
      </div>
      <div>
        <p className='my-1'>
          { text }
        </p>
        <p className='post-date'>
          <Moment format = 'YYYY/MM/DD'>{ date }</Moment>
        </p>
      </div>
    </div>
  );
};

PostUser.propTypes = {
  post: PropTypes.object.isRequired
};

export default PostUser;