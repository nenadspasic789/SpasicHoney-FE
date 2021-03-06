import React from 'react';
import {  Card, Col, Container, Row } from 'react-bootstrap';
import { faListAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CategoryType from '../../types/CategoryType';
import { Link, Redirect } from 'react-router-dom';
import api, { ApiResponse } from '../../api/api';
import RoledMainMenu from '../RoledMainMenu/RoledMainMenu';
import ApiCategoryDto from '../../dtos/ApiCategoryDto';

interface CategoryPageProperies {
    match: {
        params: {
            cId: number;
        }
    }
}

interface HomePageState {
    isUserLoggedIn: boolean;
    categories: CategoryType[];
};

class HomePage extends React.Component<CategoryPageProperies> {
    state: HomePageState;

    constructor(props: Readonly<CategoryPageProperies>) {
      super(props);

      this.state = {
        isUserLoggedIn: true,
        categories: [],
      }
    }

    componentDidMount() {
        this.getCategories();
    }

    componentDidUpdate(oldProperties: CategoryPageProperies) {
        if(oldProperties.match.params.cId === this.props.match.params.cId){
            return;
        }
        this.getCategories();
    }

    private getCategories() {
        api('api/category/?filter=parentCategoryId||$isnull', 'get', {})
        .then((res: ApiResponse) => {
            if (res.status === "error" || res.status === "login") {
                this.setLogginState(false);
                return;
            }

            this.putCategoriesInState(res.data);

        });
    }

    private putCategoriesInState(data?: ApiCategoryDto[]) {
        const categories: CategoryType[] | undefined = data?.map(category => {
            return {
                categoryId: category.categoryId,
                name: category.name,
                items: [],
            };
        });

        const newState = Object.assign(this.state, {
            categories: categories,
        });

        this.setState(newState);
    }

    private setLogginState(isLoggedIn: boolean) {
        const newState = Object.assign(this.state, {
            isUserLoggedIn: isLoggedIn,
        });

        this.setState(newState);
    }

    render() {
        if ( this.state.isUserLoggedIn === false ) {
          return (
              <Redirect to="/user/login" />
          );
        }

        return (
            <Container>
                <RoledMainMenu role="user" />
                <Card>
                    <Card.Body>
                        <Card.Title>
                            <FontAwesomeIcon icon={faListAlt}/>Top level categories
                        </Card.Title>

                            <Row>
                            { this.state.categories?.map(this.singleCategory) }
                            </Row>
                    </Card.Body>
                </Card>
            </Container>
        );
    }

    private singleCategory(category: CategoryType) {
        return (
            <Col lg="3" md="4" sm="6" xs="12">
                <Card className="mb-3">
                    <Card.Body>
                        <Card.Title as="p">{ category.name }</Card.Title>
                        <Link to={ `/category/${ category.categoryId }` } className=" btn btn-primary btn-block btn-sm">Open category</Link>
                    </Card.Body>
                </Card>
            </Col>
        );
    }
}

export default HomePage;
