"use strict";

var React = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _AppBar = _interopRequireDefault(require("@mui/material/AppBar"));

var _Box = _interopRequireDefault(require("@mui/material/Box"));

var _CssBaseline = _interopRequireDefault(require("@mui/material/CssBaseline"));

var _Divider = _interopRequireDefault(require("@mui/material/Divider"));

var _Drawer = _interopRequireDefault(require("@mui/material/Drawer"));

var _IconButton = _interopRequireDefault(require("@mui/material/IconButton"));

var _MoveToInbox = _interopRequireDefault(require("@mui/icons-material/MoveToInbox"));

var _List = _interopRequireDefault(require("@mui/material/List"));

var _ListItem = _interopRequireDefault(require("@mui/material/ListItem"));

var _ListItemIcon = _interopRequireDefault(require("@mui/material/ListItemIcon"));

var _ListItemText = _interopRequireDefault(require("@mui/material/ListItemText"));

var _Mail = _interopRequireDefault(require("@mui/icons-material/Mail"));

var _Menu = _interopRequireDefault(require("@mui/icons-material/Menu"));

var _Toolbar = _interopRequireDefault(require("@mui/material/Toolbar"));

var _Typography = _interopRequireDefault(require("@mui/material/Typography"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const drawerWidth = 240;

function ResponsiveDrawer(props) {
  const {
    window
  } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(_Toolbar.default, null), /*#__PURE__*/React.createElement(_Divider.default, null), /*#__PURE__*/React.createElement(_List.default, null, ['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => /*#__PURE__*/React.createElement(_ListItem.default, {
    button: true,
    key: text
  }, /*#__PURE__*/React.createElement(_ListItemIcon.default, null, index % 2 === 0 ? /*#__PURE__*/React.createElement(_MoveToInbox.default, null) : /*#__PURE__*/React.createElement(_Mail.default, null)), /*#__PURE__*/React.createElement(_ListItemText.default, {
    primary: text
  })))), /*#__PURE__*/React.createElement(_Divider.default, null), /*#__PURE__*/React.createElement(_List.default, null, ['All mail', 'Trash', 'Spam'].map((text, index) => /*#__PURE__*/React.createElement(_ListItem.default, {
    button: true,
    key: text
  }, /*#__PURE__*/React.createElement(_ListItemIcon.default, null, index % 2 === 0 ? /*#__PURE__*/React.createElement(_MoveToInbox.default, null) : /*#__PURE__*/React.createElement(_Mail.default, null)), /*#__PURE__*/React.createElement(_ListItemText.default, {
    primary: text
  })))));
  const container = window !== undefined ? () => window().document.body : undefined;
  return /*#__PURE__*/React.createElement(_Box.default, {
    sx: {
      display: 'flex'
    }
  }, /*#__PURE__*/React.createElement(_CssBaseline.default, null), /*#__PURE__*/React.createElement(_AppBar.default, {
    position: "fixed",
    sx: {
      width: {
        sm: `calc(100% - ${drawerWidth}px)`
      },
      ml: {
        sm: `${drawerWidth}px`
      }
    }
  }, /*#__PURE__*/React.createElement(_Toolbar.default, null, /*#__PURE__*/React.createElement(_IconButton.default, {
    color: "inherit",
    "aria-label": "open drawer",
    edge: "start",
    onClick: handleDrawerToggle,
    sx: {
      mr: 2,
      display: {
        sm: 'none'
      }
    }
  }, /*#__PURE__*/React.createElement(_Menu.default, null)), /*#__PURE__*/React.createElement(_Typography.default, {
    variant: "h6",
    noWrap: true,
    component: "div"
  }, "Responsive drawer"))), /*#__PURE__*/React.createElement(_Box.default, {
    component: "nav",
    sx: {
      width: {
        sm: drawerWidth
      },
      flexShrink: {
        sm: 0
      }
    },
    "aria-label": "mailbox folders"
  }, /*#__PURE__*/React.createElement(_Drawer.default, {
    container: container,
    variant: "temporary",
    open: mobileOpen,
    onClose: handleDrawerToggle,
    ModalProps: {
      keepMounted: true // Better open performance on mobile.

    },
    sx: {
      display: {
        xs: 'block',
        sm: 'none'
      },
      '& .MuiDrawer-paper': {
        boxSizing: 'border-box',
        width: drawerWidth
      }
    }
  }, drawer), /*#__PURE__*/React.createElement(_Drawer.default, {
    variant: "permanent",
    sx: {
      display: {
        xs: 'none',
        sm: 'block'
      },
      '& .MuiDrawer-paper': {
        boxSizing: 'border-box',
        width: drawerWidth
      }
    },
    open: true
  }, drawer)), /*#__PURE__*/React.createElement(_Box.default, {
    component: "main",
    sx: {
      flexGrow: 1,
      p: 3,
      width: {
        sm: `calc(100% - ${drawerWidth}px)`
      }
    }
  }, /*#__PURE__*/React.createElement(_Toolbar.default, null), /*#__PURE__*/React.createElement(_Typography.default, {
    paragraph: true
  }, "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Rhoncus dolor purus non enim praesent elementum facilisis leo vel. Risus at ultrices mi tempus imperdiet. Semper risus in hendrerit gravida rutrum quisque non tellus. Convallis convallis tellus id interdum velit laoreet id donec ultrices. Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl suscipit adipiscing bibendum est ultricies integer quis. Cursus euismod quis viverra nibh cras. Metus vulputate eu scelerisque felis imperdiet proin fermentum leo. Mauris commodo quis imperdiet massa tincidunt. Cras tincidunt lobortis feugiat vivamus at augue. At augue eget arcu dictum varius duis at consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem donec massa sapien faucibus et molestie ac."), /*#__PURE__*/React.createElement(_Typography.default, {
    paragraph: true
  }, "Consequat mauris nunc congue nisi vitae suscipit. Fringilla est ullamcorper eget nulla facilisi etiam dignissim diam. Pulvinar elementum integer enim neque volutpat ac tincidunt. Ornare suspendisse sed nisi lacus sed viverra tellus. Purus sit amet volutpat consequat mauris. Elementum eu facilisis sed odio morbi. Euismod lacinia at quis risus sed vulputate odio. Morbi tincidunt ornare massa eget egestas purus viverra accumsan in. In hendrerit gravida rutrum quisque non tellus orci ac. Pellentesque nec nam aliquam sem et tortor. Habitant morbi tristique senectus et. Adipiscing elit duis tristique sollicitudin nibh sit. Ornare aenean euismod elementum nisi quis eleifend. Commodo viverra maecenas accumsan lacus vel facilisis. Nulla posuere sollicitudin aliquam ultrices sagittis orci a.")));
}

ResponsiveDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: _propTypes.default.func
};
ReactDOM.render( /*#__PURE__*/React.createElement(ResponsiveDrawer, null), document.getElementById('app'));