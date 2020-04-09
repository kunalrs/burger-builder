import React, { useState } from 'react';
import Aux from '../../hoc/Aux';
import classes from './Layout.module.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

const Layout = (props) => {

    const [showSideDrawer, setSideDrawerShowState] = useState(true);

    const sideDrawerClosedHandler = () => {
       setSideDrawerShowState(false);
    }

    const sideDrawerOpenHandler = () => {
        setSideDrawerShowState(true);
    }

    return (
        <Aux>
            <Toolbar open={sideDrawerOpenHandler} />
            <SideDrawer open={showSideDrawer} closed={sideDrawerClosedHandler} />
            <main className={classes.Content}>
                {props.children}
            </main>
        </Aux>
    );
}

export default Layout;