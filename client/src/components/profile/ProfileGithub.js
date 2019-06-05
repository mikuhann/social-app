import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner';
import { connect } from "react-redux";
import { getGitHubRepos } from "../../actions/profile";

const ProfileGithub = ({ username, getGitHubRepos, repos }) => {
  useEffect(() => {
    getGitHubRepos(username);
  },[getGitHubRepos, username]);
  return (
    <div className='profile-github'>
      <h2 className='text-primary my-1'> GitHub Repositories</h2>
      {repos === null ? <Spinner/> : (
        repos.map((repository, index) => (
          <div key={index} className='repo bg-white p-1 my-1'>
            <div>
              <h4>
                <a href={repository.html_url} target='_blank' rel='noopener noreferrer'>
                  { repository.name }
                </a>
              </h4>
              <p>
                {repository.description}
              </p>
            </div>
          </div>
        ))
      )}
    </div>
  )
};

ProfileGithub.propTypes = {
  getGitHubRepos: PropTypes.func.isRequired,
  repos: PropTypes.array.isRequired,
  username: PropTypes.string.isRequired
};
const mapStateToProps = state => ({
  repos: state.profile.repos
});

export default connect(mapStateToProps, { getGitHubRepos })(ProfileGithub);
