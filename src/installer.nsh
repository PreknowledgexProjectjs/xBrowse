!macro customInstall
  WriteRegStr SHCTX "SOFTWARE\RegisteredApplications" "XBrowseApp" "Software\Clients\StartMenuInternet\XBrowseApp\Capabilities"

  WriteRegStr SHCTX "SOFTWARE\Classes\XBrowseApp" "" "XBrowseApp HTML Document"
  WriteRegStr SHCTX "SOFTWARE\Classes\XBrowseApp\Application" "AppUserModelId" "XBrowseApp"
  WriteRegStr SHCTX "SOFTWARE\Classes\XBrowseApp\Application" "ApplicationIcon" "$INSTDIR\XBrowseApp.exe,0"
  WriteRegStr SHCTX "SOFTWARE\Classes\XBrowseApp\Application" "ApplicationName" "XBrowseApp"
  WriteRegStr SHCTX "SOFTWARE\Classes\XBrowseApp\Application" "ApplicationCompany" "XBrowseApp"      
  WriteRegStr SHCTX "SOFTWARE\Classes\XBrowseApp\Application" "ApplicationDescription" "In-Work XBrowse Browser"      
  WriteRegStr SHCTX "SOFTWARE\Classes\XBrowseApp\DefaultIcon" "DefaultIcon" "$INSTDIR\XBrowseApp.exe,0"
  WriteRegStr SHCTX "SOFTWARE\Classes\XBrowseApp\shell\open\command" "" '"$INSTDIR\XBrowseApp.exe" "%1"'

  WriteRegStr SHCTX "SOFTWARE\Classes\.htm\OpenWithProgIds" "XBrowseApp" ""
  WriteRegStr SHCTX "SOFTWARE\Classes\.html\OpenWithProgIds" "XBrowseApp" ""

  WriteRegStr SHCTX "SOFTWARE\Clients\StartMenuInternet\XBrowseApp" "" "XBrowseApp"
  WriteRegStr SHCTX "SOFTWARE\Clients\StartMenuInternet\XBrowseApp\DefaultIcon" "" "$INSTDIR\XBrowseApp.exe,0"
  WriteRegStr SHCTX "SOFTWARE\Clients\StartMenuInternet\XBrowseApp\Capabilities" "ApplicationDescription" "In-Work XBrowse Browser"
  WriteRegStr SHCTX "SOFTWARE\Clients\StartMenuInternet\XBrowseApp\Capabilities" "ApplicationName" "XBrowseApp"
  WriteRegStr SHCTX "SOFTWARE\Clients\StartMenuInternet\XBrowseApp\Capabilities" "ApplicationIcon" "$INSTDIR\XBrowseApp.exe,0"
  WriteRegStr SHCTX "SOFTWARE\Clients\StartMenuInternet\XBrowseApp\Capabilities\FileAssociations" ".htm" "XBrowseApp"
  WriteRegStr SHCTX "SOFTWARE\Clients\StartMenuInternet\XBrowseApp\Capabilities\FileAssociations" ".html" "XBrowseApp"
  WriteRegStr SHCTX "SOFTWARE\Clients\StartMenuInternet\XBrowseApp\Capabilities\URLAssociations" "http" "XBrowseApp"
  WriteRegStr SHCTX "SOFTWARE\Clients\StartMenuInternet\XBrowseApp\Capabilities\URLAssociations" "https" "XBrowseApp"
  WriteRegStr SHCTX "SOFTWARE\Clients\StartMenuInternet\XBrowseApp\Capabilities\StartMenu" "StartMenuInternet" "XBrowseApp"
  
  WriteRegDWORD SHCTX "SOFTWARE\Clients\StartMenuInternet\XBrowseApp\InstallInfo" "IconsVisible" 1
  
  WriteRegStr SHCTX "SOFTWARE\Clients\StartMenuInternet\XBrowseApp\shell\open\command" "" "$INSTDIR\XBrowseApp.exe"
!macroend
!macro customUnInstall
  DeleteRegKey SHCTX "SOFTWARE\Classes\XBrowseApp"
  DeleteRegKey SHCTX "SOFTWARE\Clients\StartMenuInternet\XBrowseApp"
  DeleteRegValue SHCTX "SOFTWARE\RegisteredApplications" "XBrowseApp"
!macroend