import React from 'react';
import { MainMenu, MainMenuItem } from '../MainMenu/MainMenu';

interface RoledMainMenuProperties {
    role: 'user' | 'administrator' |  'visitor';
}


export default class RoledMainMenu extends React.Component<RoledMainMenuProperties> {
    render() {
        let items: MainMenuItem[] = [];

        switch (this.props.role) {
            case 'visitor'       : items = this.getVisitorMenuItems(); break;
            case 'user'          : items = this.getUserMenuItems(); break;
            case 'administrator' : items = this.getAdministratorMenuItems(); break;
        }

        let showCart = false;

        if (this.props.role === 'user') {
            showCart = true;
        }

        return <MainMenu items={ items } showCart={ showCart } />
    }

    getUserMenuItems(): MainMenuItem[] {
        return [
            new MainMenuItem("Home", "/"),
            new MainMenuItem("Contact", "/contact/"),
            new MainMenuItem("My Orders", "/user/orders/"),
            new MainMenuItem("Log Out", "/user/logout/"),
        ];
    }

    getAdministratorMenuItems(): MainMenuItem[] {
        return [
            new MainMenuItem("Dashboard", "/administrator/dashboard/"),
            new MainMenuItem("Log Out", "/administrator/logout/"),
        ];
    }

    getVisitorMenuItems(): MainMenuItem[] {
        return [
            new MainMenuItem("Register", "/user/register/"),
            new MainMenuItem("User Log In", "/user/login/"),
            new MainMenuItem("Administrator log In", "/administrator/login/"),
        ];
    }
}