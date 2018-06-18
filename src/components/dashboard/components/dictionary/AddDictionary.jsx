import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import DictionaryModal from '../dictionary/common/DictionaryModal';
import { createDictionary, createDictionaryUser, fetchingOrganizations, fetchDictionaries } from '../../../../redux/actions/dictionaries/dictionaryActionCreators';

export class AddDictionary extends React.Component {
  submit = data => (
    data.owner === 'Individual' ? this.props.createDictionaryUser(data).then(this.props.handleHide)
      : this.props.createDictionary(data).then(this.props.handleHide)).then(this.props.fetchDictionaries())
  render() {
    return (
      <DictionaryModal
        title="Add Dictionary"
        buttonname="Add Dictionary"
        show={this.props.show}
        modalhide={this.props.handleHide}
        submit={this.submit}
      />
    );
  }
}
AddDictionary.propTypes = {
  createDictionary: PropTypes.func.isRequired,
  createDictionaryUser: PropTypes.func.isRequired,
  handleHide: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
};


export default connect(null, {
  createDictionary,
  createDictionaryUser,
  fetchingOrganizations,
  fetchDictionaries
})(AddDictionary);
