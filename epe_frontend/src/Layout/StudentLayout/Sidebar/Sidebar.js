import React from 'react'
import classNames from 'classnames/bind'
import styles from './Sidebar.module.scss'
import Menu from './Menu/Menu'
import MenuItem from './Menu/MenuItem'
import routesConfig from '../../../config/routes'

import {
  FiUser,
  FiBookOpen,
  FiBook,
  FiSettings,
  FiLogOut,
  FiHome,
  FiHelpCircle,
} from "react-icons/fi";

const cx = classNames.bind(styles)

const Sidebar = () => {
 
  return (
    <div className={cx('wrapper')}>
      <Menu >
      <h4 className={cx('section-title')}>Welcome</h4>
        <MenuItem icon={<FiHome/>} title="Dashboard" to={routesConfig.dashboard}/>
        <MenuItem icon={<FiUser/>} title="My profile" to={routesConfig.profile}/>
        <MenuItem icon={<FiBookOpen/>} title="FlashCard" to={routesConfig.flashcard}/>
        <MenuItem icon={<FiBook/>} title="My Courses" to={routesConfig.courseStudent}/>
        <MenuItem icon={<FiHelpCircle/>} title="My Quizzes" to={routesConfig.quizStudent}/>
        <h4 className={cx('section-title')}>User</h4>
        <MenuItem icon={<FiSettings/>} title="Settings" to={routesConfig.settings}/>
        <MenuItem icon={<FiLogOut/>} title="Logout" to={routesConfig.logout}/>
      </Menu>
    </div>
  )
}

export default Sidebar