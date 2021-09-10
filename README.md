Development environment
Node.js> 8 (version 14 is recommended, too high Node version may cause compilation failure in some cases)
python2.7
Clone & install
git clone https://indrajithfocaloidsg@bitbucket.org/focaloid-admin/wiingy.git

cd wiingy
npm install
Extract 'nodemodules.zip' from the root folder , copy & past all files (openblock-blocks,openblock-device,openblock-extension,openblock-gui,openblock-link,openblock-vm) into 'node_modules' (This is the configuration step for UI & hardware)
Run
npm start

Build
For windows -> npm run build:dist
For mac -> npm run build
How to add new Extension ?
In the '\node_modules\openblock-extension\src\display' next copy 'uBrickLEDMatrix' a new folder and rename it to your extension name.

Then modify the following contents to realize your extended functions

src/display/<new extension>/index.js plug-in basic information src/display/<new extension>/blocks.js plug-in block definition src/display/<new extension>/msg.js multi-language support src/display/<new extension>/generator.js code generator rules src/display/<new extension>/toolbox.js left toolbar block arrangement and default values

1. index.js

The content of the index.js file describes the display content of the plug-in, such as the name, version, and author, and also describes the location of the plug-in’s building block rendering, code translation and other function files. 
Let's take the uBrickLEDMatrix file as an example.

        const uBrick = formatMessage => ({
        name: formatMessage({
            id: 'uBrick.name',
            default: 'uBrick.LedMatrix',
            description: ''
        }),
        extensionId: 'uBrick',
        version: '1.0.0',
        type: 'arduino',
        supportDevice: ['arduinoUno', 'arduinoNano', 'arduinoLeonardo', 'arduinoMega2560'],
        author: 'Indrajith CPY',
        iconURL: `asset/part-00727-1236.jpg`,
        description: formatMessage({
            id: 'uBrick.description',
            default: 'uBrick LED Matrix',
            description: ''
        }),
        featured: true,
        blocks: `blocks.js`,
        generator: `generator.js`,
        toolbox: `toolbox.js`,
        msg: `msg.js`,
        tags: ['display'],
        helpLink: 'https://www.google.com/'
    });
    module.exports = uBrick;



    The following parameters with an asterisk * are required parameters

       1. name*
            The name displayed on the extension selection interface
        2.  extensionId*
            Unique ID of the extension
        3   type*
            Identifies how to dispose of this plugin
        4.  version
            The version number displayed on the extension selection interface
        5.  supportDevice*
            Supported devices, the extension will only be displayed on the extension selection interface after selecting the corresponding supported device
        6.  author
            The name of the author displayed in the extension selection interface
        7.  iconURL*
            For the picture displayed on the extended selection interface, please refer to the modification in the DHT11 sample for picture scale and pixel parameters
        8.  description
            Display the extended introduction content below the picture of the extended selection interface
        9.  featured*
            This parameter is an internal parameter and must be set to true
        10. blocks*
            Extended building block rendering generation code
        11. generator*
            Translation code of the expanded building block
        12. toolbox*
            The extended toolbox code, which describes how the extension is displayed and arranged in the toolbox on the left side of the interface
        13. msg*
            Extended multi-language support
        14. tags*
            Identifies the category of this plug-in. Optional options are: actuator, sensor, display, communication, other.
        15. helpLink
            Help link. Clicking on the help on the plug-in page will open this link. It is recommended to set it to the online Wiki address of the plug-in.


2. blocks.js

This file defines the style of the building blocks inside the plug-in. The following is a code snippet of the Ubrick LED matrix template.

const color = '#428c0c';

Blockly.Blocks.uBrick_Block1 = {
    init: function () {
        this.jsonInit({
            message0: Blockly.Msg.LEDBlock1,
             args0: [
                {
                    type: 'input_value',
                    name: 'DIN'
                },
                {
                     type: 'input_value',
                    name: 'CS'
                },
                {
                    type: 'input_value',
                    name: 'CLK'
               },
               {
                    type: 'input_value',
                    name: 'COUNT'
                }
            ],
            colour: color,
            extensions: ['shape_statement']
        });
    }
};


A building block consists of the following parameters

1. message0
    The overall display content of the building block is determined by the content of message0. Since the content is translated in multiple languages, the content here is defined in msg.js. You can see that the parameters in the building block are defined in the form of %1 %2. Then the specific content of its parameters is defined by the array defined by args0.
2. args0
    a. type
        Optional values:

        input_value: The input box, the default is a rounded rectangle, that is, a receiving box for numbers and strings. If the value of the check attribute below is Boolean, then this is a sharp rectangle, that is, a receiving box for Boolean values.

        field_dropdown: drop-down box, the content of the option is defined in option.
    b. name
        Parameter name, the value of the secondary parameter will be obtained according to this name in the code translation function.
    c. check
        Optional values:

        Boolean: Define this parameter box to only receive Boolean values.
        Number: Define this parameter box to only receive numeric values.
    d. options
        Define the content of the drop-down box, the first value of the array is the actual display content, and the second value is the value obtained during code translation.
3. colour：
    Building block color, generally we usually use the same color for an extension, so here we introduce a color variable.

4. extensions：
    This parameter determines the type or external shape of the building block. The optional values ​​are:

    a.  shape_statement: a regular command block that can connect blocks up and down

    b.  output_number: rounded rectangular building block, output digital value

    c.  output_string: rounded rectangular building block, output string

    d.  output_boolean: rectangular blocks with sharp corners, output boolean value
msg.js

It is used to realize the multi-language support function, and defines the block name and the actual display content of the directory.

Object.assign(Blockly.ScratchMsgs.locales.en, {

    LEDBlock1:'LED Add Matrix DIN %1 , CS %2 , CLK %3 COUNT %4',
    LEDBlock2:'LED Set Intensity ADR %1 %2 (0..15)',
    LEDBlock3:'LED Set led ADR %1 X %2 , Y %3 , On',
    LEDBlock4:'LED Set Matrix ADR %1 %2',
    LEDBlock5:'LED Set Matrix 16x16 ADR ',
    LEDBlock6:'LED Clear ADR %1',
    LEDBlock7:'LED Shutdown ADR %1'
});
Object.assign(Blockly.ScratchMsgs.locales['zh-cn'], {
    LEDBlock1:'LED Add Matrix DIN %1 , CS %2 , CLK %3 COUNT %4',
    LEDBlock2:'LED Set Intensity ADR %1 %2 (0..15)',
    LEDBlock3:'LED Set led ADR %1 X %2 , Y %3 , On',
    LEDBlock4:'LED Set Matrix ADR %1',
    LEDBlock5:'LED Set Matrix 16x16 ADR ',
    LEDBlock6:'LED Clear ADR %1',
    LEDBlock7:'LED Shutdown ADR %1'
});
return Blockly;
generator.js

This file defines the code translation function of the plug-in building block.

Blockly.Arduino.uBrick_Block1 = function (block) { 
const DIN = Blockly.Arduino.valueToCode(block, 'DIN', Blockly.Arduino.ORDER_ATOMIC);
const CLK = Blockly.Arduino.valueToCode(block, 'CLK', Blockly.Arduino.ORDER_ATOMIC);
const CS = Blockly.Arduino.valueToCode(block, 'CS', Blockly.Arduino.ORDER_ATOMIC);
const COUNT = Blockly.Arduino.valueToCode(block, 'COUNT', Blockly.Arduino.ORDER_ATOMIC);

Blockly.Arduino.includes_.include_LED_init1 = `#include "LedControl.h"`;
Blockly.Arduino.includes_.include_LED_init2 = `LedControl led = LedControl(${DIN},${CLK},${CS},${COUNT});`;
return `led.shutdown(0,false);\n`;
} Blockly.Arduino.uBrick_Block7 = function (block) { const ADR = Blockly.Arduino.valueToCode(block, 'ADR', Blockly.Arduino.ORDER_ATOMIC); return led.shutdown(${ADR},false);\n; }
return Blockly;

In the translation function, there are two functional ways to get the internal parameters of the building block:

Blockly.Arduino.valueToCode：

This function is used to obtain the parameter content inside the building block that can receive input from other building blocks (because other building blocks may be placed in this type of input box, using this function will continue to call and parse the content of the building block content). The first parameter of the function is this block itself, the second parameter is the name of the input box, and the third parameter is the parameter priority. Just use Blockly.Arduino.ORDER_ATOMIC by default. 2. this.getFieldValue

This function is used to get the content of the drop-down box parameter inside the building block

The building block code consists of two parts, one is the include content defined at the beginning, and the other is the code content generated at the location of the building block itself. For the former:

Blockly.Arduino.includes_、Blockly.Arduino.definitions_、Blockly.Arduino.definitions_、Blockly.Arduino.setups_、Blockly.Arduino.loops_

Assigning values ​​to these variables will generate the defined content at the corresponding position of the code. Note that this is an array form, and the contents of an array with the same name will not be generated repeatedly. Duplicate code content is generated when the same block is placed and dragged.

For the latter, the code of the position of the block itself needs to be returned in return. If the building block is an output type, you also need to return a code priority when returning, here you can directly use Blockly.Arduino.ORDER_ATOMIC.

toolbox.js

This file defines the display content of the blocks in the toolbox. The following is a code snippet of the UbrickLED sample.

function addToolbox () {
return `
<category name="UB.LED Matrix" id="uBrick_CATEGORY" colour="#428c0c" secondaryColour="#428c0c" iconURI="">

    <block type="uBrick_Block1" id="uBrick_Block1">
        <value name="DIN">
            <shadow type="math_number">
                <field name="NUM">9</field>
            </shadow>
        </value>
        <value name="CS">
            <shadow type="math_number">
                <field name="NUM">10</field>
            </shadow>
        </value>
        <value name="CLK">
            <shadow type="math_number">
                <field name="NUM">11</field>
            </shadow>
        </value>
        <value name="COUNT">
            <shadow type="math_number">
                <field name="NUM">1</field>
            </shadow>
        </value>
    </block>
    <block type="uBrick_Block2" id="uBrick_Block2">
        <value name="ADR">
            <shadow type="math_number">
                <field name="NUM">0</field>
            </shadow>
        </value>
        <value name="ADR2">
            <shadow type="math_number">
                <field name="NUM">8</field>
            </shadow>
        </value>
    </block>
    <block type="uBrick_Block3" id="uBrick_Block3">
        <value name="ADR">
            <shadow type="math_number">
                <field name="NUM">0</field>
            </shadow>
        </value>
        <value name="X">
            <shadow type="math_number">
                <field name="NUM">0</field>
            </shadow>
        </value>
        <value name="Y">
            <shadow type="math_number">
                <field name="NUM">0</field>
            </shadow>
        </value>
    </block>
    <block type="uBrick_Block4" id="uBrick_Block4">
        <value name="ADR">
            <shadow type="math_number">
                <field name="NUM">0</field>
            </shadow>
        </value>
        <value name="MATRIX">
            <shadow type="matrix">
            <field name="MATRIX">0000000001111110010000100101101001011010010000100111111000000000</field>
            </shadow>
        </value>
    </block>

    <block type="uBrick_Block6" id="uBrick_Block6">
        <value name="ADR">
            <shadow type="math_number">
                <field name="NUM">0</field>
            </shadow>
        </value>
    </block>
    <block type="uBrick_Block7" id="uBrick_Block6">
        <value name="ADR">
            <shadow type="math_number">
                <field name="NUM">0</field>
            </shadow>
        </value>
    </block>
</category>`;
}

exports = addToolbox;


How to add new device?

1. Add device picture and configuration

	a) Make a picture of the control panel based on the following parameters and sample pictures. Please make sure to leave a white edge with a suitable width around to ensure a 		uniform style. This picture will be displayed in the device selection interface.

		Format : png

		Resolution : 600x372

		Background color : white

		You can directly save the following picture to modify the production, and name the picture file after the completion of the camel case rule, such as:arduinoUno.png

	b) Make and generate pictures in svg format. The two pictures made in this step will be used on the interface when the device is connected.

		Pull out the main body of the control board, delete the background of the picture, and adjust the aspect ratio of the picture to 108:87. Place the control board in the center and make the edge of the picture as close to the control board as possible. Then save it in png format. Then adjust the aspect ratio of the picture to 1:1 with the same requirements, and save it again.

		Visit this online format conversion website: aconvert.com . Upload the two images you just made and convert them to SVG format. Remember to select the **Resize image** option and set them to 108x87** and **40x40 respectively .

		The name of the 108x87 picture is:, <board name>-illustration.svgsuch as:arduinoUno-illustration.svg

	c) Place the three pictures made in a folder named after the control panel, such as:, arduinoUno move them to the 
		path openblock-gui\src\lib\libraries\devices\, and the file tree 	structure will be as follows after completion.	


		\node_modules\openblock-gui\src\lib\libraries\devices\
		|- arduinoLeonardo\
		|- arduinoMega2560\
			|- baseToolbox\
			|- ...
			|- <board name>\
			|- <board name>.png
			|- <board name>-illustration.svg
			|- <board name>-small.svg
			|- index.jsx

	d) Modify index.jsx.
		In the \node_modules\openblock-gui\src\lib\libraries\devices\index.jsx file, you can see that there are already some device codes here,
		 taking the parameters of Arduino UNO as an example.First, import image resources at the top of the file:

		import arduinoUnoIconURL from './arduinoUno/arduinoUno.png';
		import arduinoUnoConnectionIconURLL from './arduinoUno/arduinoUno-illustration.svg';
		import arduinoUnoConnectionSmallIconURL from './arduinoUno/arduinoUno-small.svg';		


		Then, set the device parameters below (in \node_modules\openblock-gui\src\lib\libraries\devices\index.jsx)

		{
			name: 'Arduino Uno',
			deviceId: 'arduinoUno',
			manufactor: 'arduino.cc',
			leanMore: 'https://store.arduino.cc/usa/arduino-uno-rev3',
			type: 'arduino',
			iconURL: arduinoUnoIconURL,
			description: (
				<FormattedMessage
					defaultMessage="A great board to get started with electronics and coding."
					description="Description for the Arduino Uno device"
					id="gui.device.arduinoUno.description"
				/>
			),
			featured: true,
			disabled: false,
			bluetoothRequired: false,
			serialportRequired: true,
			defaultBaudRate: '9600',
			internetConnectionRequired: false,
			launchPeripheralConnectionFlow: true,
			useAutoScan: false,
			connectionIconURL: arduinoUnoConnectionIconURLL,
			connectionSmallIconURL: arduinoUnoConnectionSmallIconURL,
			connectingMessage: (
				<FormattedMessage
					defaultMessage="Connecting"
					description="Message to help people connect to their arduino."
					id="gui.device.arduino.connectingMessage"
				/>
			),
			baseToolBoxXml: arduinoBaseToolBox,
			programMode: ['realtime', 'upload'],
			programLanguage: ['block', 'c', 'cpp'],
			tags: ['arduino'],
			helpLink: 'https://store.arduino.cc/usa/arduino-uno-rev3'
		}



			->name
			The name displayed by the device.

			->deviceId
			The device ID will be used when the openblock-vm loads the device.

			->baseDeviceId
			Only used in third-party control boards derived from the basic control board. The panel is used to designate which derived from the control panel, is assigned as arduinoUnothe time, which will make use of the kit can be loaded plug Arduino UNO panel prepared for the widget selection interface.

			->manufactor
			This will be displayed in the manufacturer entry in the device selection interface.

			->leanMore
			The manufacturer link can be placed, which will open when the device name or learn more button is clicked. It is recommended to set it as the company website or mall address.

			->type
			Tell the GUI which code generator to use.

			->iconURL
			Will be displayed in the device selection interface.

			->description
			It will be displayed below the iconURL on the device selection interface, where FormattedMessage is used to provide different translations in multiple languages.

			->featured
			This is an internal parameter and it should always be set to true.

			->disabled
			If set to true, this device option will be disabled, will be grayed out and cannot be selected.

			->bluetoothRequired/serialportRequired/internetConnectionRequired
			Set to true to display the corresponding connection icon in the requirement bar of the device selection interface. These parameters are only used to display the icon and will not affect the actual connection function.

			->defaultBaudRate
			The default serial port baud rate, after selecting the device, the baud rate of the serial terminal will be automatically set according to this value.

			->launchPeripheralConnectionFlow
			Setting it to true will open the device connection interface after selecting the device. It is recommended to set it to true.

			->useAutoScan
			If set to true, the scanned device will be automatically connected. It is not recommended to turn it on.

			->connectionIconURL
			Will be used to display in the device connection interface.

			->connectionSmallIconURL
			Will be displayed in the top bar of the device connection interface.

			->connectingMessage
			This information will be displayed when the device is connected, and it is not recommended to modify this content.

			->baseToolBoxXml
			The basic building block content of the equipment is provided, and it is not recommended to modify it.

			->programMode
			When the device does not support the corresponding programming mode, it will automatically switch to the supported mode and lock the mode switch. At the same time, it also controls the display in the programming mode column of the device selection interface.

			->programLanguage
			It is only used to control the display of icons in the programming language bar of the device selection interface.

			->tags
			It is used to set the device category, which will take effect when you click the filter above.

			->extensions

			Assigning values ​​to the array can automatically load the set plug-ins after selecting the control board. As for the assignment dht11, the control panel after selecting the dht11 plug will be automatically loaded.

			->helpLink

			It will be used in the device connection interface. Click the help button in the interface to open this link. It is recommended to set it to the product online Wiki address.

		e) After completing these tasks, you should be able to see the newly added device in the device selection interface, but if we click on it,
			nothing will be sent. We still need to add the device code in openblock-vm.

2. 	Add device code in openblock-vm

	a) In the \node_modules\openblock-vm\src\devicescreation of the path a new folder, named the name of the control panel, 
		such as: arduinoUno. Copy \node_modules\openblock-vm\src\devices\arduinoUno\index.js to this new 	folder, 
		and the file tree structure will look like this after completion:

	openblock-vm\src\devices\
    |- arduinoLeonardo\
    |- arduinoMega2560\
    |- ...
    |- <board name>\
        |- index.js


	b) Now we come to modify the index.js file.

		In the file, the code comments are already very detailed, the following only introduces the part of the content you need to modify, 
		and the file frame structure.

		This file carve two Class, ArduinoUnoand OpenBlockArduinoUnoDevicefunction, with the former responsible for implementing hardware interfaces and communication content, which is the building block for realizing the contents of the device, while the former will be called by the former open interface function blocks in real time mode Code.

		->PID/VID filter

			const PNPID_LIST = [
			'USB\\VID_2341&PID_0043',
			'USB\\VID_2341&PID_0001',
			'USB\\VID_2A03&PID_0043',
			'USB\\VID_2341&PID_0243',
			// For chinese clones that use CH340
			'USB\\VID_1A86&PID_7523'
			// Uncomment this to close filter
			// '*'
		];

		-> Serial port parameters

			const CONFIG = {
				baudRate: 57600,
				dataBits: 8,
				stopBits: 1
			};

		Used to set parameters such as the baud rate used when connecting to the device in real-time mode.

		-> Equipment compilation and programming parameters

		const DIVECE_OPT = {
			type: 'arduino',
			fqbn: 'arduino:avr:uno',
			firmware: 'arduinoUno.standardFirmata.ino.hex'
		}

		type Tell  which compiler and programming software to use to receive and process upload requests.

		fqbn Used to provide to arduino_builder. Setting this parameter is essentially the same as the operation of selecting the control board type in the Arduino IDE

		firmware Used to set the real-time mode firmware used by the control board.

		-> Catalogue and building blocks

			getInfo() {
				return [
					{
						// ...
						blocks: [
								{
									// ...
									programMode: [ProgramModeType.UPLOAD]
								}
							]
						//...
					},
				{
						//...
					}
				]
			}

			What is returned here is an array of objects, which contains multiple brick directories. Among them, programMode is used to set the programming mode supported by the building block. If this parameter is not set, all are supported by default.

3. Add device to extension manager¶

	In the \node_modules\openblock-vm\src\extension-support\extension-manager.jsvicinity of the line number 32, your new device index file is added in the list.

	const builtinDevices = {
		arduinoUno: () => require('../devices/arduinoUno'),
		arduinoNano: () => require('../devices/arduinoNano')
		<board id>: () => require('../devices/<board name>')
	};

	