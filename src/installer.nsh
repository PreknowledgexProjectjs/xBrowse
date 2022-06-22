!macro customInstall
  DeleteRegKey SHCTX "SOFTWARE\Classes\XBrowseApp"
  DeleteRegKey SHCTX "SOFTWARE\Clients\StartMenuInternet\XBrowseApp"
  DeleteRegValue SHCTX "SOFTWARE\RegisteredApplications" "XBrowseApp"

  WriteRegStr SHCTX "SOFTWARE\RegisteredApplications" "" "Software\Clients\StartMenuInternet\xBrowse\Capabilities"xBrowse

  WriteRegStr SHCTX "SOFTWARE\Classes\xBrowse" "" "xBrowse HTML Document"
  WriteRegStr SHCTX "SOFTWARE\Classes\xBrowse\Application" "AppUserModelId" "xBrowse"
  WriteRegStr SHCTX "SOFTWARE\Classes\xBrowse\Application" "ApplicationIcon" "$INSTDIR\xBrowse.exe,0"
  WriteRegStr SHCTX "SOFTWARE\Classes\xBrowse\Application" "ApplicationName" "xBrowse"
  WriteRegStr SHCTX "SOFTWARE\Classes\xBrowse\Application" "ApplicationCompany" "xBrowse"      
  WriteRegStr SHCTX "SOFTWARE\Classes\xBrowse\Application" "ApplicationDescription" "In-Work XBrowse Browser"      
  WriteRegStr SHCTX "SOFTWARE\Classes\xBrowse\DefaultIcon" "DefaultIcon" "$INSTDIR\xBrowse.exe,0"
  WriteRegStr SHCTX "SOFTWARE\Classes\xBrowse\shell\open\command" "" '"$INSTDIR\xBrowse.exe" "%1"'

  WriteRegStr SHCTX "SOFTWARE\Classes\.htm\OpenWithProgIds" "xBrowse" ""
  WriteRegStr SHCTX "SOFTWARE\Classes\.html\OpenWithProgIds" "xBrowse" ""

  WriteRegStr SHCTX "SOFTWARE\Clients\StartMenuInternet\xBrowse" "" "xBrowse"
  WriteRegStr SHCTX "SOFTWARE\Clients\StartMenuInternet\xBrowse\DefaultIcon" "" "$INSTDIR\xBrowse.exe,0"
  WriteRegStr SHCTX "SOFTWARE\Clients\StartMenuInternet\xBrowse\Capabilities" "ApplicationDescription" "In-Work XBrowse Browser"
  WriteRegStr SHCTX "SOFTWARE\Clients\StartMenuInternet\xBrowse\Capabilities" "ApplicationName" "xBrowse"
  WriteRegStr SHCTX "SOFTWARE\Clients\StartMenuInternet\xBrowse\Capabilities" "ApplicationIcon" "$INSTDIR\xBrowse.exe,0"
  WriteRegStr SHCTX "SOFTWARE\Clients\StartMenuInternet\xBrowse\Capabilities\FileAssociations" ".htm" "xBrowse"
  WriteRegStr SHCTX "SOFTWARE\Clients\StartMenuInternet\xBrowse\Capabilities\FileAssociations" ".html" "xBrowse"
  WriteRegStr SHCTX "SOFTWARE\Clients\StartMenuInternet\xBrowse\Capabilities\URLAssociations" "http" "xBrowse"
  WriteRegStr SHCTX "SOFTWARE\Clients\StartMenuInternet\xBrowse\Capabilities\URLAssociations" "https" "xBrowse"
  WriteRegStr SHCTX "SOFTWARE\Clients\StartMenuInternet\xBrowse\Capabilities\StartMenu" "StartMenuInternet" "xBrowse"
  
  WriteRegDWORD SHCTX "SOFTWARE\Clients\StartMenuInternet\xBrowse\InstallInfo" "IconsVisible" 1
  
  WriteRegStr SHCTX "SOFTWARE\Clients\StartMenuInternet\xBrowse\shell\open\command" "" "$INSTDIR\xBrowse.exe"
!macroend
!macro customUnInstall
  DeleteRegKey SHCTX "SOFTWARE\Classes\xBrowse"
  DeleteRegKey SHCTX "SOFTWARE\Clients\StartMenuInternet\xBrowse"
  DeleteRegValue SHCTX "SOFTWARE\RegisteredApplications" "xBrowse"
!macroend