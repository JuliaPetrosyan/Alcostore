import React from 'react';
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import 'bootstrap/dist/css/bootstrap.css';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {blue} from "@material-ui/core/colors";


const styles = () => ({
  ContentItem: {
    // width: 275,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'rgba(198,127,108,0.76)',
    margin: 10,
    textAlign: "center",
  },
  ContentImageDiv: {
    minWidth: 70,
    overflow: 'hidden',
    position: 'relative',
    textAlign: 'center',
    cursor: 'pointer',
    height: 240,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  ContentItemHR: {
    width: '75%',
    marginTop: 5,
    marginBottom: 5
  },
  ContentImage: {
    width: 'auto',
    height: '100%'
  },
  ContentButtonDiv: {
    padding: 3
  },
  ContentCountItem: {
    width: 50
  },
  ContentAddToCart: {
    color: '#d60000',
    cursor: 'pointer'
  },
  ContentAddToCartSpan: {
    marginRight: 10
  }
});

class Content extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      count: 1,
      discount: false
    };
  }

  handleMinusButtonClick = () => {
    this.setState({
      count: this.state.count > 1 ? this.state.count - 1 : 1
    });
  };

  handlePlusButtonClick = () => {
    this.setState({
      count: this.state.count + 1
    });
  };

  handleItemCountChange = (event) => {
    this.setState({
      count: event.target.value > 1 ? parseInt(event.target.value) : 1
    });
  };

  handleAddToCartClicked = () => {
    alert('Added to Cart!!!');
  };

  render() {
    // const { classes, name, category, price, photo, description, size } = this.props;
    const { classes, name, category, price, image, volume } = this.props;
    const { count } = this.state;
    let classForContentItem = classNames('col-md-3', 'col-sm-6', 'col-6', classes.ContentItem);
    return (
      <div className={classForContentItem}>
        <div className={classes.ContentImageDiv}>
          <img alt={category} src={image} className={classes.ContentImage}/>
        </div>
        <hr className={classes.ContentItemHR}></hr>
        <h5>{name}</h5>
        <hr className={classes.ContentItemHR}></hr>
        {/* <h1>{category}</h1> */}
        <h6>{price * count} դրամ</h6>
        <h6>{count} հատ</h6>
        <div className={classes.ContentButtonDiv}>
          <button onClick={this.handleMinusButtonClick}>
            <FontAwesomeIcon
              icon="minus"
            />
          </button>
          <input type="number" value={count} className={classes.ContentCountItem} onChange={this.handleItemCountChange} min='1'/>
          <button onClick={this.handlePlusButtonClick}>
            <FontAwesomeIcon
              icon="plus"
            />
          </button>
        </div>
        {/* <h6>{description}</h6> */}
        <h6>{volume} լ</h6>
        <hr className={classes.ContentItemHR}></hr>
        <label className={classes.ContentAddToCart} onClick={this.handleAddToCartClicked}>
          <span className={classes.ContentAddToCartSpan}> Ավելացնել </span>
          <FontAwesomeIcon
            icon="cart-plus"
          />          
        </label>
      </div>
    );
  }
}

Content.propTypes = {
  classes: PropTypes.shape({
    ContentItem: PropTypes.string,
    ContentImageDiv: PropTypes.string,
    ContentItemHR: PropTypes.string,
    ContentImage: PropTypes.string,
    ContentButtonDiv: PropTypes.string,
    ContentCountItem: PropTypes.string,
    ContentAddToCart: PropTypes.string,
    ContentAddToCartSpan: PropTypes.string
  })
};

export default withStyles(styles)(Content);
