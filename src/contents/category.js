import React from 'react';
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import 'bootstrap/dist/css/bootstrap.css';
import classNames from 'classnames/bind';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const styles = () => ({
    CategoryItem: {
      // width: 275,
      borderWidth: 1,
      borderStyle: 'solid',
      borderColor: 'rgba(198,127,108,0.76)',
      margin: 10,
      cursor: 'pointer',
      textAlign: 'center'
    },
    CategoryImageDiv: {
      minWidth: 70,
      overflow: 'hidden',
      position: 'relative',
      textAlign: 'center',
      cursor: 'pointer',
      height: 180,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center'
    },
    CategoryItemHR: {
      width: '75%'
    },
    CategoryImage: {
      width: '100%',
      height: '100%'
    }
});

class Category extends React.Component {
    constructor(props){
        super(props);
        this.state = {

        };
    }

    handleCatClick = (name) => {
        const { onCatClick } = this.props;
        onCatClick(name);
    }

    render() {
        const { classes, name, photo } = this.props;
        let classForCategoryItem = classNames('col-md-3', 'col-sm-6', 'col-6', classes.CategoryItem);

        return (
            <div className={classForCategoryItem} onClick={() => this.handleCatClick( name) }>
                <div className={classes.CategoryImageDiv}>
                    <img alt={name} src={photo} className={classes.CategoryImage}/>
                </div>
                <hr className={classes.CategoryItemHR}></hr>
                <h5>{name}</h5>                
            </div>
        );
    }
}

Category.propTypes = {
    classes: PropTypes.shape({
        CategoryItem: PropTypes.string,
        CategoryImageDiv: PropTypes.string,
        CategoryImage: PropTypes.string,
        CategoryItemHR: PropTypes.string,
        onCatClick: PropTypes.func
    })
};

export default withStyles(styles)(Category);