import React, {Component} from 'react';
import Aux from '../../hoc/Auxiliary';
import styles from './Layout.module.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';



class Layout extends Component {
    state={
        backdropShow: false
    }

    backdropHandler=()=>{
        this.setState({backdropShow: false})
    }

    backdropOpener=()=>{
        this.setState((prevState)=>{
            return{backdropShow: true}
        })
    }

    render(){
    return(<Aux> 
    <Toolbar openSideDrawer={this.backdropOpener}/>
    <SideDrawer backdropShow={this.state.backdropShow} backdropHandler={this.backdropHandler}/>
    <main className={styles.Content}>{this.props.children}</main>
    </Aux>)
}
}

export default Layout;