import AppleIcon from '@mui/icons-material/Apple';
import { styled } from '@mui/material';
import { Link } from 'react-router-dom';

const LogoWrapper = styled('div')`
  & a {
    color: ${({theme}) => theme.palette.text.primary};
    font-size: medium;
  }
  & a:hover {
    color: ${({theme}) => theme.palette.primary.main};
  }
  & a svg {
    font-size: 36px;
  }
`

export const Logo = () => {
  return (
    <LogoWrapper>
      <Link to={'/'}>
        <AppleIcon />
      </Link>
    </LogoWrapper>
  )
}