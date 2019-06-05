import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

const ProfileEducation = ({education: {
  school,
  degree,
  from,
  to,
  fieldofstudy,
  description
}}) =>
  <div>
    <h3>{ school }</h3>
    <p>
      <Moment format = 'YYYY/MM/DD'>{ from }</Moment> - {!to ? 'Now' : <Moment format = 'YYYY/MM/DD'>{ to }</Moment>}
    </p>
    <p><strong>Degree:</strong> { degree }</p>
    {fieldofstudy && <p><strong>Field of study:</strong> {fieldofstudy }</p>}
    {description && <p><strong>Program description:</strong> { description }</p>}
  </div>;

ProfileEducation.propTypes = {
  education: PropTypes.object.isRequired
};

export default ProfileEducation;