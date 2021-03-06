import React from 'react';
import ReactDOM from 'react-dom';
import cx from 'classnames';
import useConnect from '../../prod_lib/useConnect';
import * as action from '../../prod_lib/control';
import { TitleBar } from 'react-desktop/macOs';

const IconLoading = () => (
  <svg
    viewBox="0 0 1024 1024"
    focusable="false"
    className="anticon-spin"
    data-icon="loading"
    width="1em"
    height="1em"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M988 548c-19.9 0-36-16.1-36-36 0-59.4-11.6-117-34.6-171.3a440.45 440.45 0 0 0-94.3-139.9 437.71 437.71 0 0 0-139.9-94.3C629 83.6 571.4 72 512 72c-19.9 0-36-16.1-36-36s16.1-36 36-36c69.1 0 136.2 13.5 199.3 40.3C772.3 66 827 103 874 150c47 47 83.9 101.8 109.7 162.7 26.7 63.1 40.2 130.2 40.2 199.3.1 19.9-16 36-35.9 36z" />
  </svg>
);

const IconClose = () => (
  <svg
    viewBox="64 64 896 896"
    focusable="false"
    data-icon="close"
    width="1em"
    height="1em"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 0 0 203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z" />
  </svg>
);

const IconPlus = () => (
  <svg
    viewBox="64 64 896 896"
    focusable="false"
    data-icon="plus"
    width="1em"
    height="1em"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M482 152h60q8 0 8 8v704q0 8-8 8h-60q-8 0-8-8V160q0-8 8-8z" />
    <path d="M176 474h672q8 0 8 8v60q0 8-8 8H176q-8 0-8-8v-60q0-8 8-8z" />
  </svg>
);

const IconReload = () => (
  <svg
    viewBox="64 64 896 896"
    focusable="false"
    data-icon="reload"
    width="1em"
    height="1em"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M909.1 209.3l-56.4 44.1C775.8 155.1 656.2 92 521.9 92 290 92 102.3 279.5 102 511.5 101.7 743.7 289.8 932 521.9 932c181.3 0 335.8-115 394.6-276.1 1.5-4.2-.7-8.9-4.9-10.3l-56.7-19.5a8 8 0 0 0-10.1 4.8c-1.8 5-3.8 10-5.9 14.9-17.3 41-42.1 77.8-73.7 109.4A344.77 344.77 0 0 1 655.9 829c-42.3 17.9-87.4 27-133.8 27-46.5 0-91.5-9.1-133.8-27A341.5 341.5 0 0 1 279 755.2a342.16 342.16 0 0 1-73.7-109.4c-17.9-42.4-27-87.4-27-133.9s9.1-91.5 27-133.9c17.3-41 42.1-77.8 73.7-109.4 31.6-31.6 68.4-56.4 109.3-73.8 42.3-17.9 87.4-27 133.8-27 46.5 0 91.5 9.1 133.8 27a341.5 341.5 0 0 1 109.3 73.8c9.9 9.9 19.2 20.4 27.8 31.4l-60.2 47a8 8 0 0 0 3 14.1l175.6 43c5 1.2 9.9-2.6 9.9-7.7l.8-180.9c-.1-6.6-7.8-10.3-13-6.2z" />
  </svg>
);

const IconLeft = () => (
  <svg
    viewBox="64 64 896 896"
    focusable="false"
    data-icon="left"
    width="1em"
    height="1em"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M724 218.3V141c0-6.7-7.7-10.4-12.9-6.3L260.3 486.8a31.86 31.86 0 0 0 0 50.3l450.8 352.1c5.3 4.1 12.9.4 12.9-6.3v-77.3c0-4.9-2.3-9.6-6.1-12.6l-360-281 360-281.1c3.8-3 6.1-7.7 6.1-12.6z" />
  </svg>
);

const IconRight = () => (
  <svg
    viewBox="64 64 896 896"
    focusable="false"
    data-icon="right"
    width="1em"
    height="1em"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M765.7 486.8L314.9 134.7A7.97 7.97 0 0 0 302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 0 0 0-50.4z" />
  </svg>
);

function Control() {
  const { tabs, tabIDs, activeID } = useConnect();
  const validUrl = require('../../prod_lib/isUrl.js');
  const { ipcRenderer , app } = require('electron')

  const jsonDataSetup = require(`${process.cwd()}/dataSetup.json`);

  const settings_data = require('data-store')({ path: jsonDataSetup.userData + '/settings.json' });
  const search_engines = require('data-store')({ path: jsonDataSetup.userData + '/search_engines.json' });

  if(settings_data.get('default_search') == undefined){
    settings_data.set('default_search','google');
  }

  const { url, canGoForward, canGoBack, isLoading } = tabs[activeID] || {};
  const settings = () => {
    ipcRenderer.send('open-settings', 'yes')
  }

  const closeh = () => ipcRenderer.send('close-app');
  const minimize = () => ipcRenderer.send('minimize-app');;
  const toggleMaximize = () =>ipcRenderer.send('max-app');;
  const onUrlChange = e => {
    // Sync to tab config
    const v = e.target.value;
    action.sendChangeURL(v);
  };
  const onPressEnter = e => {
    if (e.keyCode !== 13) return;
    const v = e.target.value.trim();
    if (!v) return;

    let href = v;
    if (!/^.*?:\/\//.test(v)) {
      if(validUrl.isUri(v)){
        href = `http://${v}`;
      }else{
        href = `${search_engines.get(settings_data.get('default_search'))}${v}`;
      }
    }
    action.sendEnterURL(href);
  };
  const close = (e, id) => {
    e.stopPropagation();
    action.sendCloseTab(id);
  };
  const newTab = () => {
    action.sendNewTab();
  };

  const closeWin = () => {
    ipcRenderer.send('close-app');
  };
  const minMax = () => {
    ipcRenderer.send('minimize-app');
  };
  const miniApp = () => {
    ipcRenderer.send('mini-app');
  }
  const fullScreentoggle = () => {
    ipcRenderer.send('fullScreentoggle');
  }
  const openSettings = () => {
   
   ipcRenderer.send('open_settings');
  };
  const openMarket = () => {
   
   ipcRenderer.send('open_market');
  };
  const switchTab = id => {
    action.sendSwitchTab(id);
  };
  

  return (
    <div>

      <div className="container" style={{ marginTop:'0' , padding:'0px 0px' }}>
        <span type="plus" className="button btn-normal-danger fa fa-close" style={{ float:'right' , borderRadius:'0px' , marginTop:'0'}} onClick={closeWin}>
           
         </span>
         <span type="plus" className="button btn-normal-info fa fa-window-restore " style={{ float:'right' , borderRadius:'0px', marginTop:'0'}} onClick={minMax}>
       
         </span>
         <span type="plus" className="button btn-normal-success fa fa-window-minimize" style={{ float:'right' , borderRadius:'0px', marginTop:'0'}} onClick={miniApp}>
         </span>
         <span type="plus" className="button btn-normal-info fa fa-expand" style={{ float:'right' , borderRadius:'0px', marginTop:'0'}} onClick={fullScreentoggle}>
  
         </span>
         <span type="plus" className="button btn-normal-info dragg fa fa-arrows" style={{ float:'right' , borderRadius:'0px', marginTop:'0'}} >
           
         </span>
        <div  className="tabs">
          <>
            {tabIDs.map(id => {
              // eslint-disable-next-line no-shadow
              const { title, isLoading, favicon } = tabs[id] || {};
              return (
                <div
                  key={id}
                  className={cx('tab', { active: id === activeID })}
                  onClick={() => switchTab(id)}
                >
                  {isLoading ? <div class="ac-spinner">
                                  <div class="sp-circle sp-sm"></div>
                                  <div class="sp-label"></div>
                              </div> : !!favicon && <img src={favicon} width="16" alt="icon" />}
                  <div className="title">
                    <div className="title-content">{title}</div>
                  </div>
                  <span className="close fa fa-close" onClick={e => close(e, id)}></span>
                </div>
              );
            })}
            <span type="plus" className="plusic" style={{ marginLeft: 10 }} onClick={newTab}>
              <IconPlus />
            </span>

            
          </>
        </div>
        
        <div className="bars">
          <div className="bar address-bar">
            <div className="actions">
              <div
                className={cx('action', { disabled: !canGoBack })}
                onClick={canGoBack ? action.sendGoBack : undefined}
              >
                <IconLeft />
              </div>
              <div
                className={cx('action', { disabled: !canGoForward })}
                onClick={canGoForward ? action.sendGoForward : undefined}
              >
                <IconRight />
              </div>
              <div className={cx('action')} onClick={isLoading ? action.sendStop : action.sendReload}>
                {isLoading ? <IconClose /> : <IconReload />}
              </div>
              <div className="chip" >
               <img src="../../icons/icon.png" id="site_logo"/> 
               <ls className="lw"> Hi </ls>
              </div>
            </div>
            {/*<div className="autocomplete">*/}
              <input
                className="address"
                id="address"
                value={url || ''}
                onChange={onUrlChange}
                onKeyDown={onPressEnter}
                spellCheck="true"
                placeholder="Search or Type a URL"
              />
            {/*</div>*/}
            <div className="actions" id="chip_acc">
              {/*<div
                className={"settings"}
              >
                <img className="mx-auto d-block" src="" id="login_logo"/>  
              </div>*/}
              <div className="chip" >
               <img src="" id="login_logo"/> 
               <ls className="user_name">  </ls>
              </div>
              <span type="plus" className="plusic" style={{ marginLeft: 10 }} onClick={openSettings}>
                <img src={"../../in_app_icons/cog.png"} width="16" alt="icon" />
              </span>
              <span type="plus" className="plusic" style={{ marginLeft: 10 }} onClick={openMarket}>
                <img src={"../../in_app_icons/mk.png"} width="16" alt="icon" />
              </span>
            </div>
          </div>

        </div>
      </div>
      
    </div>
  );
}

// eslint-disable-next-line no-undef
ReactDOM.render(<Control />, document.getElementById('app'));
