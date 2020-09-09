import React from 'react';
import { Nav, Container } from 'react-bootstrap';

export class MainMenuItems {
    text: string = '';
    link: string = '';

    constructor(text: string, link: string) {
        this.text = text;
        this.link = link;
    }
}

interface MainMenuProperties {
    items: MainMenuItems[];
}

export class MainMenu extends React.Component<MainMenuProperties> {
    render() {
        return (
            <Container>
                <Nav variant="tabs">
                    { this.props.items.map(this.makeNavLink) }
                </Nav>
            </Container>
        );
    }

    private makeNavLink(item: MainMenuItems) {
        return (
            <Nav.Link href={ item.link }>{ item.text }</Nav.Link>
            );
    }
}