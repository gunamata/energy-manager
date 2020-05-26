import React from 'react';
import MenuItem from 'app/shared/layout/menus/menu-item';
import { DropdownItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { NavLink as Link } from 'react-router-dom';
import { NavDropdown } from './menu-components';

export const EntitiesMenu = props => (
  <NavDropdown icon="th-list" name="Entities" id="entity-menu" style={{ maxHeight: '80vh', overflow: 'auto' }}>
    <MenuItem icon="asterisk" to="/region">
      Region
    </MenuItem>
    <MenuItem icon="asterisk" to="/country">
      Country
    </MenuItem>
    <MenuItem icon="asterisk" to="/site">
      Site
    </MenuItem>
    <MenuItem icon="asterisk" to="/energy-type">
      Energy Type
    </MenuItem>
    <MenuItem icon="asterisk" to="/energy-billing-data">
      Energy Billing Data
    </MenuItem>
    <MenuItem icon="asterisk" to="/weather-data">
      Weather Data
    </MenuItem>
    {/* jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here */}
  </NavDropdown>
);
