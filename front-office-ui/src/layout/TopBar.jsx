import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import logo from "../images/logo.png";
import mainmenu from "../images/mainmenu.png";
import HeaderBtn from '../Common/FormComponent/HeaderBtn';
import { useNavigate } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import MenuImg1 from "../images/MenuImg1.png";
import MenuImg2 from "../images/MenuImg2.png";
import MenuImg3 from "../images/MenuImg3.png";
import MenuImg4 from "../images/MenuImg4.png";
import MenuImg5 from "../images/MenuImg5.png";
import MenuImg6 from "../images/MenuImg6.png";
import MenuImg7 from "../images/MenuImg7.png";
import MenuImg8 from "../images/MenuImg8.png";
import MenuImg9 from "../images/MenuImg9.png";
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
import AddchartIcon from '@mui/icons-material/Addchart';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import SimpleListMenu from './SimpleListMenu';
import MenuIcon from '@mui/icons-material/Menu';
import { actionCreators } from '../redux/actions/actionCreators';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

export default function PrimarySearchAppBar() {
  const clientCode = import.meta.env.VITE_CLIENT_CODE;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const ip = localStorage.getItem("userIP");
  const { cartList } = useSelector(state => state.getcartList)

  const goToMututal = () => {
    navigate('/fundexplorer');
  };
  const goInvestmentCart = () => {
    navigate('/investmentcarts');
  };

  const [anchorE2, setAnchorE2] = React.useState(null);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  React.useEffect(() => {
    getCartList();
  }, [])

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu className='ulmainmenu'
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >

      <MenuItem onClick={handleMenuClose} className='mainmenu'>
        <div className='Menu'>
          <div className='finalmenu'>
            <img src={MenuImg1} />
            <div>Mutual <br />Fund</div>
          </div>
        </div>

      </MenuItem>


      <MenuItem onClick={handleMenuClose} className='mainmenu'>
        <div className='Menu'>
          <div className='finalmenu'>
            <img src={MenuImg2} />
            <div>Financial <br />Planning</div>
          </div>
        </div>

      </MenuItem>

      <MenuItem onClick={handleMenuClose} className='mainmenu'>
        <div className='Menu'>
          <div className='finalmenu '>
            <img src={MenuImg3} />
            <div>Goal<br /> Planning</div>
          </div>
        </div>

      </MenuItem>



      <MenuItem onClick={handleMenuClose} className='mainmenu'>
        <div className='Menu'>
          <div className='finalmenu'>
            <img src={MenuImg4} />
            <div>CRM</div>
          </div>
        </div>

      </MenuItem>

      <MenuItem onClick={handleMenuClose} className='mainmenu'>
        <div className='Menu'>
          <div className='finalmenu'>
            <img src={MenuImg5} />
            <div>Order</div>
          </div>
        </div>

      </MenuItem>


      <MenuItem onClick={handleMenuClose} className='mainmenu'>
        <div className='Menu'>
          <div className='finalmenu '>
            <img src={MenuImg6} />
            <div>Futura</div>
          </div>
        </div>

      </MenuItem>

      <MenuItem onClick={handleMenuClose} className='mainmenu'>
        <div className='Menu'>
          <div className='finalmenu'>
            <img src={MenuImg7} />
            <div>Reports</div>
          </div>
        </div>

      </MenuItem>
      <MenuItem onClick={handleMenuClose} className='mainmenu'>
        <div className='Menu'>
          <div className='finalmenu'>
            <img src={MenuImg8} />
            <div>Tools</div>
          </div>
        </div>

      </MenuItem>
      <MenuItem onClick={handleMenuClose} className='mainmenu'>
        <div className='Menu'>
          <div className='finalmenu '>
            <img src={MenuImg9} />
            <div>Setup</div>
          </div>
        </div>

      </MenuItem>




    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >

      <MenuItem onClick={handleMenuClose} className='menuwid'>
        <div className='Menu Menu111'>
          <div className='finalmenu'>
            <img src={MenuImg1} />
            <div>Mutual <br />Fund</div>
          </div>
        </div>

      </MenuItem>

      <MenuItem onClick={handleMenuClose} className='menuwid'>
        <div className='Menu'>
          <div className='finalmenu'>
            <img src={MenuImg2} />
            <div>Financial <br />Planning</div>
          </div>
        </div>

      </MenuItem>

      <MenuItem onClick={handleMenuClose} className='menuwid'>
        <div className='Menu'>
          <div className='finalmenu '>
            <img src={MenuImg3} />
            <div>Goal<br /> Planning</div>
          </div>
        </div>

      </MenuItem>



      <MenuItem onClick={handleMenuClose} className='menuwid'>
        <div className='Menu'>
          <div className='finalmenu'>
            <img src={MenuImg4} />
            <div>CRM</div>
          </div>
        </div>

      </MenuItem>



      <MenuItem onClick={handleMenuClose} className='menuwid'>
        <div className='Menu'>

          <div className='finalmenu'>
            <img src={MenuImg5} />
            <div>Order</div>
          </div>
        </div>

      </MenuItem>
      <MenuItem onClick={handleMenuClose} className='menuwid'>
        <div className='Menu'>

          <div className='finalmenu '>
            <img src={MenuImg6} />
            <div>Futura</div>
          </div>
        </div>

      </MenuItem>



      <MenuItem onClick={handleMenuClose} className='menuwid'>
        <div className='Menu'>
          <div className='finalmenu'>
            <img src={MenuImg7} />
            <div>Reports</div>
          </div>

        </div>

      </MenuItem>

      <MenuItem onClick={handleMenuClose} className='menuwid'>
        <div className='Menu'>
          <div className='finalmenu'>
            <img src={MenuImg8} />
            <div>Tools</div>
          </div>
        </div>

      </MenuItem>

      <MenuItem onClick={handleMenuClose} className='menuwid'>
        <div className='Menu'>
          <div className='finalmenu '>
            <img src={MenuImg9} />
            <div>Setup</div>
          </div>
        </div>

      </MenuItem>


    </Menu>
  );
  // -----------for ham burger----------------
  const handleMenu1 = (event) => {
    setAnchorE2(event.currentTarget);
  };

  const handleClose = () => {
    navigate('/dashboard')
  };

  const handleSecurityView = () => {
    navigate('/securityview');
  };

  const handleAllConfiguratorDetails = () => {
    navigate('/order-configurations');
  }
  const handleAllUdfConfigurator = () => {
    navigate('/udf-configurations');
  }
  const handleAllPortfolioDetails = () => {
    navigate('/PortfolioConfig');
  }

  const handlePortfolioView = () => {
    navigate('/portfolio-view');
  };
  const handleQuickConfigurations = () => {
    navigate('/quick-configurations');
  };

  const handleListingPlacedOreder = () => {
    navigate('/order-view');
  };

  const handleRiskProfile = () => {
    navigate('/riskprofileone');
  };

  const handleFundExplorer = () => {
    navigate('/fundExplorer');
  };

  const handleModelPortfolio = () => {
    navigate('/modelPortfolio');
  }

  const handleFundCompare = () => {
    navigate('/fundComparison');
  };

  const handlePortfolioRebalancingMain  = () => {
    navigate('/portfoliorebalancing');
  };

  const handleGoalPlanning  = () => {
    navigate('/goalplanning');
  };
  // ----------------------------
  const handleLogout = async () => {
    const userName = await localStorage.getItem('UserName');

    const body = {
      userName: userName,
      isSessionExpired: false,
      hostName: window.location.hostname,
      ipAddress: ip
    }
    dispatch(actionCreators.validateLogout(body)).then(() => {
      dispatch(actionCreators.validateLogin(null, true))
      dispatch(actionCreators.GetSchemeList(null, true))
      localStorage.removeItem('token');
      localStorage.removeItem('UserName');
      localStorage.removeItem('userIP');
      navigate('/');
    })
      .catch((error) => {
        console.log(error);
      });
  };

  const getCartList = () => {
    dispatch(actionCreators.getCartList({
      //  "clientCode": 35
      "clientCode": clientCode
    }))
    // api.post('/InvestmentCart/getCartDetails', {
    //   "clientCode": 35
    // }).then((res) => {

    //   const count = res.data.data.length;
    //   setCartCount(count);
    //   setCartList(res.data.data);
    // });
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" >
        <Toolbar style={{ backgroundColor: "#472D68" }}>
          {/* ----------extra ham burger done by ui team ------------ */}
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={handleMenu1}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorE2}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorE2)}
            onClose={() => setAnchorE2(null)}
          >
            <MenuItem onClick={handleClose}>Dashboard</MenuItem>
            <MenuItem onClick={handleAllConfiguratorDetails}>Order Configurations</MenuItem>
            <MenuItem onClick={handleAllUdfConfigurator}>UDF Configurations</MenuItem>
            <MenuItem onClick={handleSecurityView}>Security View</MenuItem>
            <MenuItem onClick={handleAllPortfolioDetails}>Portfolio Configurator</MenuItem>
            <MenuItem onClick={handlePortfolioView}>Portfolio View</MenuItem>
            <MenuItem onClick={handleQuickConfigurations}>Quick Order Configurator</MenuItem>
            <MenuItem onClick={handleListingPlacedOreder}>Listing Placed Order</MenuItem>
            <MenuItem onClick={handleRiskProfile}>Risk Profile</MenuItem>
            <MenuItem onClick={handleFundExplorer}>Fund Explorer</MenuItem>
            <MenuItem onClick={handleModelPortfolio}>Model Portfolio</MenuItem>
            <MenuItem onClick={handleFundCompare}>Fund Compare</MenuItem>
            <MenuItem onClick={handlePortfolioRebalancingMain}>Portfolio Rebalancing </MenuItem>
            <MenuItem onClick={handleGoalPlanning}>Goal Planning </MenuItem>
            
            
          </Menu>
          {/*----------------------------------------------------------  */}

          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'block', sm: 'block', md: 'block', lg: 'block' } }}
          >
            <img src={logo} className='mainlogocss' />
          </Typography>

          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <SimpleListMenu />
          </Box>


          <HeaderBtn label={
            <div>
              <span className='top6inmain leftfloats'>
                <AccountBalanceIcon className='mainicotop' />
              </span>
              <span className='headtpbnd leftfloats'>Mutual Fund</span>
            </div>
          } className='hideincell topbtnnav' onClick={goToMututal} />
          <HeaderBtn label={
            <div>
              <span className='top6inmain leftfloats'><SignalCellularAltIcon className='mainicotop' /></span>
              <span className='headtpbnd leftfloats '>Pri IPO</span>

            </div>

          } className='hideincell topbtnnav'></HeaderBtn>
          <HeaderBtn label={
            <div>
              <span className='top6inmain leftfloats'>
                <AddchartIcon className='mainicotop' />
              </span>
              <span className='headtpbnd leftfloats'>Bond</span>

            </div>
          } className='hideincell topbtnnav'></HeaderBtn>
          <HeaderBtn label={
            <div >
              <span className='top6inmain leftfloats'><HealthAndSafetyIcon className='mainicotop' /></span>
              <span className='headtpbnd leftfloats'>Insurance</span>

            </div>

          } className='hideincell topbtnnav'></HeaderBtn>
          <Box sx={{ flexGrow: 1 }} />
          <Search sx={{ display: { xs: 'none', sm: 'none', md: 'none', lg: 'block' } }}>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>

          <Box sx={{}}>
            <IconButton size="large" aria-label="show 4 new mails" color="inherit" onClick={goInvestmentCart}>
              <Badge badgeContent={cartList.length} color="error">
                <AddShoppingCartIcon />
              </Badge>
            </IconButton>
            {/* ---------------------------------- */}

            <IconButton className='posiincell'
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            >
              <Badge badgeContent={0} color="error"
              >
                <LogoutIcon onClick={handleLogout} />
              </Badge>
            </IconButton>

            {/* ------------------------------------- */}
            {/* <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <img src={mainmenu} />
            </IconButton> */}

          </Box>

          <Box sx={{}}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <img src={mainmenu} />
            </IconButton>

          </Box>

        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}