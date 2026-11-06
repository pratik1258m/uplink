$ErrorActionPreference = "Stop"

$env:JAVA_HOME = "C:\Program Files\Android\Android Studio\jbr"
$env:ANDROID_HOME = "C:\Users\yukta\AppData\Local\Android\Sdk"
$env:Path = "$($env:JAVA_HOME)\bin;$($env:ANDROID_HOME)\platform-tools;$($env:Path)"

Write-Host "=== Java Version ==="
& java -version

Write-Host "=== Connected Devices ==="
& adb devices

Write-Host "=== Building Debug APK ==="
Set-Location "c:\RIDDHESH\upplonkk\uplink\android"
.\gradlew.bat assembleDebug --no-daemon

if ($LASTEXITCODE -ne 0) {
    Write-Error "Gradle build failed with exit code $LASTEXITCODE"
    exit $LASTEXITCODE
}

Write-Host "=== Installing APK on connected device ==="
$apkPath = "c:\RIDDHESH\upplonkk\uplink\android\app\build\outputs\apk\debug\app-debug.apk"
if (-not (Test-Path $apkPath)) {
    Write-Error "APK not found at $apkPath"
    exit 1
}

& adb -d install -r -d $apkPath

Write-Host "=== Setting up adb reverse for Metro bundler (port 8081) ==="
& adb reverse tcp:8081 tcp:8081

Write-Host "=== Launching App ==="
& adb shell am start -n com.upplinkapp/.MainActivity

Write-Host "=== App successfully launched! ==="

