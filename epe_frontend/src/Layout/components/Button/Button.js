import React from "react";
import classNames from "classnames/bind";
import styles from "./Button.module.scss";

import { Link } from "react-router-dom";

const cx = classNames.bind(styles);

const Button = ({
  to,
  href,
  primary = false,
  outline = false,
  small = false,
  large = false,
  disabled = false,
  leftIcon ,
  rightIcon,
  className,
  onClick,
  children,
  ...passProps
}) => {
  let Comp = "button";

  const props = {
    onClick,
    ...passProps,
  };

  if (disabled) {
    delete props.onClick;
  }
  if (to) {
    props.to = to;
    Comp = Link;
  } else if (href) {
    props.href = href;
    Comp = "a";
  }

  const classes = cx("wrapper", {
    primary,
    outline,
    small,
    large,
    disabled,
    [className]: className,
  });
  return (
    <Comp className={classes} {...props}>
      {leftIcon && <span className={cx('icon')}>{leftIcon}</span>}
      <span className={cx('title')}>{children}</span>
      {rightIcon && <span className={cx('icon')}>{rightIcon}</span>}
    </Comp>
  );
};

export default Button;
