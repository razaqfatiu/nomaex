import React, { Component } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faBriefcase,
  faPaperPlane,
  faQuestion,
  faImage,
  faTimes,
  faAppleAlt,
  faFish,
  faTractor,
  faLeaf,
  faTree,
  faCarrot,
  faEgg,
  faCat

} from "@fortawesome/free-solid-svg-icons";
import { } from '@fortawesome/fontawesome-svg-core'
import { } from '@fortawesome/react-fontawesome'

import { Nav, Button } from "react-bootstrap";
import classNames from "classnames";

class SideBar extends Component {
  render() {
    return (
      <div className={classNames("sidebar", { "is-open": this.props.isOpen })}>
        <div className="sidebar-header">
          <Button
            variant="link"
            onClick={this.props.toggle}
            style={{ color: "#fff" }}
            className="mt-4"
          >
            <FontAwesomeIcon icon={faTimes} pull="right" size="xs" />
          </Button>
          <h3>CATEGORIES</h3>
        </div>

        <Nav className="flex-column pt-2">
          {/* <p className="ml-3">Heading</p> */}

          <Nav.Item className="active">
            <Nav.Link href="/">
              <FontAwesomeIcon icon={faImage} className="mr-2" />
              CEREALS
            </Nav.Link>
          </Nav.Item>

          <Nav.Item>
            <Nav.Link href="/">
              <FontAwesomeIcon icon={faTractor} className="mr-2" />
              FARM-TOOLS
            </Nav.Link>
          </Nav.Item>

          {/* <SubMenu
            title="Pages"
            icon={faCopy}
            items={["Link", "Link2", "Active"]}
          /> */}

          <Nav.Item>
            <Nav.Link href="/">
              <FontAwesomeIcon icon={faFish} className="mr-2" />
              FISHERY
            </Nav.Link>
          </Nav.Item>



          <Nav.Item>
            <Nav.Link href="/">
              <FontAwesomeIcon icon={faCarrot} className="mr-2" />
              FRUIT
            </Nav.Link>
          </Nav.Item>

          <Nav.Item>
            <Nav.Link href="/">
              <FontAwesomeIcon icon={faCat} className="mr-2" />
              LIVESTOCK
            </Nav.Link>
          </Nav.Item>

          <Nav.Item>
            <Nav.Link href="/">
              <FontAwesomeIcon icon={faEgg} className="mr-2" />
              POULTRY
            </Nav.Link>
          </Nav.Item>

          <Nav.Item>
            <Nav.Link href="/">
              <FontAwesomeIcon icon={faQuestion} className="mr-2" />
              SERVICES
            </Nav.Link>
          </Nav.Item>

          <Nav.Item>
            <Nav.Link href="/">
              <FontAwesomeIcon icon={faTree} className="mr-2" />
              TUBERS
            </Nav.Link>
          </Nav.Item>


          <Nav.Item>
            <Nav.Link href="/">
              <FontAwesomeIcon icon={faLeaf} className="mr-2" />
              VEGETABLES
            </Nav.Link>
          </Nav.Item>


          <Nav.Item>
            <Nav.Link href="/">
              <FontAwesomeIcon icon={faQuestion} className="mr-2" />
              OTHERS
            </Nav.Link>
          </Nav.Item>


        </Nav>
      </div>
    );
  }
}

export default SideBar;