const arduinoUno = formatMessage => ({
    name: 'arduinoUno',
    extensionId: 'arduinoUno',
    version: '1.0.0',
    type: 'arduino',
    supportDevice: ['arduinoUno', 'arduinoNano', 'arduinoLeonardo', 'arduinoMega2560'],
    author: 'ArthurZheng',
    iconURL: `asset/arduinoUno.png`,
    description: formatMessage({
        id: 'arduinoUno.description',
        default: 'arduinoUno Temperature and humidity sensor module.',
        description: 'Description of arduinoUno'
    }),
    featured: true,
    blocks: 'blocks.js',
    generator: 'generator.js',
    toolbox: 'toolbox.js',
    msg: 'msg.js',
    location: 'local', // or 'remote'
    library: 'lib',
    tags: ['sensor'],
    helpLink: 'https://openblockcc.gitee.io/wiki/'
});

module.exports = arduinoUno;
