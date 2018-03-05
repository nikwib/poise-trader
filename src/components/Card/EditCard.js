
import React from 'react';
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import { baseUrl } from './../../config';
import { updateCard } from './../../actions';



class EditCard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  handleClick = (event) => {
    // This prevents ghost click.
    event.preventDefault();

    this.setState({
      open: true,
      anchorEl: event.currentTarget,
    });
  };

  handleRequestClose = () => {
    this.setState({
      open: false,
    });
  };

  updateCard = async (card) => (
    await fetch((baseUrl + '/cards'), {
     method: 'PUT',
     headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
     body: JSON.stringify(card)
   })
  )

  submit = (e) => {
    e.preventDefault();
 
    const card = {
      ...this.props.card, 
      equity: this.refs.equity.input.value
    }
    console.log('Refs', this.refs.equity.input.value)
    console.log('Submit card: ', card)
    
    this.updateCard(card);
    this.props.updateCard(card);
  }

  render() {
    return (
      <div>
        <FlatButton
          onClick={this.handleClick}
          label="Edit"
        />
        <Popover
          open={this.state.open}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
          targetOrigin={{ horizontal: 'left', vertical: 'top' }}
          onRequestClose={this.handleRequestClose}
        >
          <div>
            <form onSubmit={this.submit} className="add-card-form">
              <TextField
                id="equity"
                type="text"
                floatingLabelText="Equity"
                defaultValue={this.props.card.equity}
                ref="equity"
              />
              <button>Update </button>
            </form>
          </div>
        </Popover>
      </div>
    );
  }
}


const mapStateToProps = (state) => ({
  // Map your state to props
});

const mapDispatchToProps = (dispatch) => ({
  // Map your dispatch actions
  updateCard: (cards) => dispatch(updateCard(cards)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditCard);

