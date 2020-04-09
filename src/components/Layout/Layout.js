import React, { useState } from 'react';
import Aux from '../../hoc/Aux';
import classes from './Layout.module.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

const Layout = (props) => {

    const [showSideDrawer, setSideDrawerShowState] = useState(false);

    const sideDrawerClosedHandler = () => {
       setSideDrawerShowState(false);
    }

    const sideDrawerToggleHandler = () => {
        setSideDrawerShowState(!showSideDrawer);
    }

    return (
        <Aux>
            <Toolbar open={sideDrawerToggleHandler} />
            <SideDrawer open={showSideDrawer} closed={sideDrawerClosedHandler} />
            <main className={classes.Content}>
                {props.children}
            </main>
        </Aux>
    );
}

export default Layout;