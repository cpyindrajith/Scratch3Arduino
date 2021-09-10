
!macro customInstall
     #CreateShortCut "$SMSTARTUP\filename.lnk" "$INSTDIR\filename.exe"
     ExecWait "$INSTDIR\drivers\CH341SER.EXE"

!macroend

