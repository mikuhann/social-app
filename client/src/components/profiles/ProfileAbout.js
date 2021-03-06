import React, { Fragment } from 'react';


const ProfileAbout = ({profile: {
  user: { name },
  bio,
  skills
}}) => {
  return (
    <div className="profile-about bg-light p-2">
      {bio && <Fragment>
        <h2 className="text-primary">{name.trim().split(' ')[0]}'s Bio</h2>
        <p>
          {bio}
        </p>
        <div className="line"></div>
      </Fragment>}
      <h2 className="text-primary">Skills</h2>
      <div className="skills">
        {skills.map((skill, index) => (
          <div key={index} className="p-1"><i className="fa fa-check"/>{' '}{skill}</div>
        ))}
      </div>
    </div>
  );
};

export default ProfileAbout;