import React, { Fragment } from 'react';
import Moment from 'react-moment';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { deleteEducation } from "../../actions/profile";

const EducationRow = ({ education, deleteEducation }) => {
  const educations = education.map((education) => (
    <tr key={ education._id }>
      <td>{ education.school }</td>
      <td className='hide-sm'>{ education.degree }</td>
      <td className='hide-sm'>
        <Moment format='YYYY/MM/DD'>{ education.from }</Moment> - {
        education.to === null ? (' Now') : (<Moment format ='YYYY/MM/DD'>{ education.to }</Moment>)
      }
      </td>
      <td>
        <button onClick={() => deleteEducation(education._id)} className='btn btn-danger'>Delete</button>
      </td>
    </tr>
  ));
  return (
    <Fragment>
      <h2 className="my-2">
        <table className="table">
          <thead>
          <tr>
            <th>School</th>
            <th className='hide-sm'>Degree</th>
            <th className='hide-sm'>Years</th>
            <th/>
          </tr>
          </thead>
          <tbody>{educations}</tbody>
        </table>
      </h2>
    </Fragment>
  );
};

EducationRow.propTypes = {
  education: PropTypes.array.isRequired,
  deleteEducation: PropTypes.func.isRequired
};

export default connect(null, { deleteEducation })(EducationRow);