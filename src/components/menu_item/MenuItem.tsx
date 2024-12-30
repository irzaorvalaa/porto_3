import * as React from 'react';
import { Link, matchPath, useLocation, useMatch } from 'react-router-dom';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from '@mui/material';
import clsx from 'clsx';
import { MenuItemProps } from './interfaces';
import './MenuItem.scss';

// Icons
import { ReactComponent as ArrowDownward } from '../../assets/svg/icons/arrow-downward.svg';

const MenuItem = ({ route, childs }: MenuItemProps) => {
  const location = useLocation();
  const isMatch = (path: string) => matchPath({ path }, location.pathname);

  return (
    <ListItem disablePadding className="menu-item">
      {!childs && (
        <ListItemButton
          className={clsx(
            "menu-item__btn",
            isMatch(route.path) ? "menu-item__btn--active" : ""
          )}
        >
          <Link to={route.path as string} className="menu-item__link">
            <div className="menu-item__content">
              <ListItemText primary={route.name} />
            </div>
          </Link>
        </ListItemButton>
      )}

      {childs && (
        <List className="menu-item__list">
          <Accordion
            className="menu-item__accordion"
            disableGutters
            elevation={0}
            defaultExpanded
          >
            <AccordionSummary
              className="menu-item__accordion-summary"
              expandIcon={<ArrowDownward className="text-white" />}
            >
              <Typography className="menu-item__accordion-title">
                {route.name}
              </Typography>
            </AccordionSummary>
            <AccordionDetails className="menu-item__accordion-details">
              {childs.map((child, index) => (
                <ListItem key={index} disablePadding className="menu-item">
                  <ListItemButton
                    className={clsx(
                      "menu-item__btn",
                      isMatch(child.path) ? "menu-item__btn--active" : ""
                    )}
                  >
                    <Link
                      to={child.path as string}
                      className="menu-item__link menu-item__link--child"
                    >
                      <div className="menu-item__content">
                        <ListItemText primary={child.name} />
                      </div>
                    </Link>
                  </ListItemButton>
                </ListItem>
              ))}
            </AccordionDetails>
          </Accordion>
        </List>
      )}
    </ListItem>
  );
};

export default MenuItem;
