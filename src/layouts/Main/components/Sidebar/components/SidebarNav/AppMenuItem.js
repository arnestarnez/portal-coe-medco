import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import {
    Typography,
} from '@material-ui/core';
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
//import ListItemLink from '@material-ui/core/ListItemLink'
import Divider from '@material-ui/core/Divider'
import Collapse from '@material-ui/core/Collapse'

import IconExpandLess from '@material-ui/icons/ExpandLess'
import IconExpandMore from '@material-ui/icons/ExpandMore'

// React runtime PropTypes
//{ title, href, items=[], key, level }
export const AppMenuItemPropTypes={
    title: PropTypes.string.isRequired,
    href: PropTypes.string,
    items: PropTypes.array,
    key: PropTypes.string,
}

// TypeScript compile-time props type, infered from propTypes
// https://dev.to/busypeoples/notes-on-typescript-inferring-react-proptypes-1g88
type appMenuItemPropTypes=PropTypes.InferProps<typeof AppMenuItemPropTypes>
type appMenuItemPropsWithoutItems=Omit<appMenuItemPropTypes, 'items'>

// Improve child items declaration
export type AppMenuItemProps=appMenuItemPropsWithoutItems&{
    items?: AppMenuItemProps[]
}

const AppMenuItem: React.FC<AppMenuItemProps>=props => {
    const { cls,title, href, items=[], key, level }=props
    const classes=useStyles()
    const isExpandable=items&&items.length>0
    const [open, setOpen]=React.useState(false)
    console.log(items)
    const marginLeftVar=level*22;
    const MenuItemChildren=isExpandable? (
        <ul className="dropdown-menu" role="menu">

            {
                items.map((item, index) => (
                    <AppMenuItem {...item} key={index} level={level+1} />
                ))
            }
        </ul>

    ):null

    const MenuItemRoot=isExpandable?
        (
            <li className="dropdown" ><a className="dropdown-toggle" href="" data-toggle="dropdown">
                {title}<span className="caret"></span></a>
                {
                    MenuItemChildren
                }
            </li>
        ):

        (
            <li><a href={href}>
                <i class={cls}></i>{title}</a>
                
            </li>


        )


    return (
        <>
            {MenuItemRoot}
            {//MenuItemChildren
            }
        </>
    )
}

AppMenuItem.propTypes=AppMenuItemPropTypes

const useStyles=makeStyles(theme =>
    createStyles({
        menuItem: { color: '#fff', },
        menuItemIcon: {
            color: '#fff',
        },
    }),
)

export default AppMenuItem
