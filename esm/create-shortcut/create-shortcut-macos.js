/**
 * Needs triage from quark-carlo
 */
// info.plist
const infoDOTplist = `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
	<key>CFBundleExecutable</key>
	<string>@@FILENAME@@</string>
	<key>CFBundleDisplayName</key>
	<string>@@NAME@@</string>
	<key>CFBundleIconFile</key>
	<string>@@FILENAME@@</string>
	<key>CFBundleIdentifier</key>
	<string>com.quark.@@FILENAME@@</string>
	<key>CFBundleName</key>
	<string>@@FILENAME@@</string>
	<key>CFBundlePackageType</key>
	<string>APPL</string>
	<key>CFBundleSignature</key>
	<string>????</string>
	<key>CFBundleSupportedPlatforms</key>
	<array>
		<string>MacOSX</string>
	</array>
	<key>CFBundleVersion</key>
	<string>1.0</string>
</dict>
</plist>`