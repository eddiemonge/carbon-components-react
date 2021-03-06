import PropTypes from 'prop-types';
import React from 'react';
import Icon from '../components/Icon';
import classNames from 'classnames';

const propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  small: PropTypes.bool,
  kind: PropTypes.oneOf(['primary', 'secondary', 'danger']).isRequired,
  href: PropTypes.string,
  tabIndex: PropTypes.number,
  type: PropTypes.oneOf(['button', 'reset', 'submit']),
  role: PropTypes.string,
  icon: PropTypes.string,
  iconDescription: props => {
    if (props.icon && !props.iconDescription) {
      return new Error(
        'icon property specified without also providing an iconDescription property.'
      );
    }
    return undefined;
  },
};

const defaultProps = {
  tabIndex: 0,
  type: 'button',
  disabled: false,
  small: false,
  kind: 'primary',
};

const Button = ({
  children,
  className,
  disabled,
  small,
  kind,
  href,
  tabIndex,
  type,
  icon,
  iconDescription,
  ...other
}) => {
  const buttonClasses = classNames(className, {
    'bx--btn': true,
    'bx--btn--sm': small,
    'bx--btn--primary': kind === 'primary',
    'bx--btn--danger': kind === 'danger',
    'bx--btn--secondary': kind === 'secondary',
  });

  const commonProps = {
    tabIndex,
    className: buttonClasses,
  };

  const buttonImage = icon
    ? <Icon
        name={icon}
        description={iconDescription}
        className="bx--btn__icon"
      />
    : null;

  const button = (
    <button {...other} {...commonProps} disabled={disabled} type={type}>
      {children}
      {buttonImage}
    </button>
  );

  const anchor = (
    <a {...other} {...commonProps} href={href} role="button">
      {children}
      {buttonImage}
    </a>
  );

  return href ? anchor : button;
};

Button.propTypes = propTypes;
Button.defaultProps = defaultProps;

export default Button;
