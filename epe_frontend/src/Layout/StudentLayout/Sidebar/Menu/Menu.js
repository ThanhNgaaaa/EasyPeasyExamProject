import React from 'react'
import classNames from 'classnames/bind'
import styles from './Menu.module.scss'

const cx=classNames.bind(styles)
const Menu = ({children}) => {
  return (
    <nav className={cx('menu-list')} >
      {children}
      </nav>
  )
}

export default Menu