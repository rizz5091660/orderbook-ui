import React from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col } from 'reactstrap';

import TableTrade from "./table.component";

export default class Content extends React.Component {

  render() {

    return (
      <div>
        <Nav tabs>
         <NavItem>
            <NavLink className='active'>
              USD
            </NavLink>
          </NavItem>
        </Nav>

        <TabContent>
          <TabPane>
            <Row>
              <Col sm="12">
                <TableTrade />
              </Col>
            </Row>
          </TabPane>
        </TabContent>
      </div>
    );
  }
}