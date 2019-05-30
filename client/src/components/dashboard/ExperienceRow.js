import React, { Fragment } from 'react';
import Moment from 'react-moment';
import PropTypes from 'prop-types';
import { connect } from "react-redux";

const ExperienceRow = ({ experience }) => {
  const experiences = experience.map((experience) => (
    <tr key={ experience._id }>
      <td>{ experience.company }</td>
      <td className='hide-sm'>{ experience.title }</td>
      <td className='hide-sm'>
        <Moment format='YYYY/MM/DD'>{ experience.from }</Moment> - {
        experience.to === null ? (' Now') : (<Moment format ='YYYY/MM/DD'>{ experience.to }</Moment>)
      }
      </td>
      <td>
        <button className='btn btn-danger'>Delete</button>
      </td>
    </tr>
  ));
  return (
    <Fragment>
      <h2 className="my-2">
        <table className="table">
          <thead>
          <tr>
            <th>Company</th>
            <th className='hide-sm'>Title</th>
            <th className='hide-sm'>Years</th>
            <th/>
          </tr>
          </thead>
          <tbody>{experiences}</tbody>
        </table>
      </h2>
    </Fragment>
  );
};

ExperienceRow.propTypes = {
  experience: PropTypes.array.isRequired
};

export default ExperienceRow;