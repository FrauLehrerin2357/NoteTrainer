Set WshShell = CreateObject("WScript.Shell")
WshShell.CurrentDirectory = "C:\Users\Test\Desktop\Notetrainer"
WshShell.Run "cmd /c C:\Program Files\nodejs\npm.cmd run dev", 0, False
