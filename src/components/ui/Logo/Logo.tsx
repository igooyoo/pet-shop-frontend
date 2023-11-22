import clsx from 'clsx';

const Logo = ({ className = '', isBlack = true, ...props }) => (
  <img
    src={isBlack ? '/Logo-Black.svg' : '/Logo-White.svg'}
    alt="Logo"
    className={clsx(className, 'text-red')}
    {...props}
  />
);

export default Logo;
