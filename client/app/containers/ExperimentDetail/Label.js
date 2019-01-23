/**
 *
 * ProjectSetting
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import Section from 'components/Section';
import { Button, Modal, message, Layout, Form, Icon, Input, Tag } from 'antd';
import styled from 'styled-components';
// import { sendInviteAction, resetStateAction, setMenuKey } from './actions';
// import {makeSelectInvite} from './selectors';

/*
* Member component
*/
const LabelItem = ({ className, label }) => (
  <div className={className}>
    <span>{label} </span>
  </div>
);

LabelItem.propTypes = {
  LabelItem: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  label: PropTypes.string,
};

const StyledLabelItem = styled(LabelItem)`
  font-size: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid #dbd8d8;
`;


/*
* Invite Form
*/
function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class LabelForm extends React.Component {
  componentDidMount() {
    // To disabled submit button at the beginning.
    this.props.form.validateFields();
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        // const projectId = this.props.projectId;
        // this.props.dispatch(sendInviteAction(values, projectId))
      }
    });
  }

  componentDidUpdate(){
    // if(this.props.inviteFlag){
    //   message.info('Invite sent successfully!');
    //   this.props.dispatch(resetStateAction());
    // }
  }

  render() {
    const {
      getFieldDecorator, getFieldsError, getFieldError, isFieldTouched,
    } = this.props.form;

    const labelError = isFieldTouched('email') && getFieldError('email');
    return (
      <Form layout="inline" onSubmit={this.handleSubmit} style={this.props.style}>
        <Form.Item
          style={{width:'20%'}}
          >
          <Button
            type="primary"
            htmlType="submit"
            disabled={hasErrors(getFieldsError())}
            style={{width:'150%'}}
          >
            Add
          </Button>
        </Form.Item>
        <Form.Item
          wrapperCol={{span: 24}}
          style={{width:'70%'}}
          validateStatus={labelError ? 'error' : ''}
          help={labelError || ''}
         >
           {getFieldDecorator('label', {
             rules: [{
               required: true, message: 'Please input your E-mail!',
             }],
           })(
             <Input placeholder="Please input the label"/>
           )}
         </Form.Item>
      </Form>
    );
  }
}

const WrappedLabelForm = Form.create({ name: 'label_form' })(LabelForm);


/*
* Main component
*/
export class Label extends React.Component {
  state = { visible: false };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = () => {
    this.setState({
      visible: false,
    });
  };

  handleCancel = () => {
    this.setState({
      visible: false,
    });
  };

  render() {

    // const members = this.props.projectDetail.members;
    // const projectId =this.props.match.params.id;
    const labelDOM =  this.props.labels ? (
      <span style={{marginLeft:'10px'}}>
        { this.props.labels.map(tag => (
          <Tag color="blue" key={tag}>
            {tag}
          </Tag>
        )) }
      </span>
    ): null;

    return <div style={this.props.style}>

      <Button type="primary" onClick={this.showModal} >
        <span>
          Labels
        </span>
      </Button>

      {labelDOM}

      <Modal
        title="Labels"
        visible={this.state.visible}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
      >
      <WrappedLabelForm style={{marginBottom:'30px'}}
        dispatch={this.props.dispatch}
         />
      </Modal>
    </div>;
  }
}

Label.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  // projectDetail: makeSelectProjectDetail(),
  // inviteFlag: makeSelectInvite(),
});

function mapDispatchToProps(dispatch) {
  return {
      dispatch,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Label);
