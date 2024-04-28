const { Client, GatewayIntentBits, Partials, PermissionsBitField, REST, Routes } = require('discord.js')
const fs = require('fs')
var colors = require('colors')

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.DirectMessages
    ],
    partials: [
        Partials.Message,
        Partials.Channel,
        Partials.Reaction
    ]
})
client.commands = new Map() 
client.slashCommands = new Map() 

const prefix = "!" 
const token = "TOKEN_KAMU" // Ganti dengan token bot Discord Anda
const CLIENT_ID = "KLIENID_KAMU" // Client id di developer portal do o2auth
const TEST_GUILD = "SERVER_KAMU" // Server Lu

const commandFiles = fs.readdirSync('./perintah').filter(file => file.endsWith('.js'))

for (const file of commandFiles) {
    const command = require(`./perintah/${file}`)
    client.commands.set(command.perintah, command)
}

const api = new REST({ version: '10' }).setToken(token)

let slashfolder = fs.readdirSync('./slash')
var slash_commands = []

slashfolder.forEach(dir => {
    const slashcmd = fs.readdirSync(`./slash/${dir}`).filter(f => f.endsWith('.js'))
    for (var i in slashcmd) {
        var slashcmdFile = require(`./slash/${dir}/${slashcmd[i]}`)
        if (slashcmdFile) {
            client.slashCommands.set(slashcmdFile.perintah, slashcmdFile)
            slash_commands.push({
                perintah: slashcmdFile.perintah,
                description: slashcmdFile.description,
const { Client, GatewayIntentBits, Partials, PermissionsBitField, REST, Routes } = require('discord.js')
const fs = require('fs')
var colors = require('colors')

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.DirectMessages
    ],
    partials: [
        Partials.Message,
        Partials.Channel,
        Partials.Reaction
    ]
})
client.commands = new Map() 
client.slashCommands = new Map() 

const prefix = "!" 
const token = "TOKEN_KAMU" // Ganti dengan token bot Discord Anda
const CLIENT_ID = "KLIENID_KAMU" // Client id di developer portal do o2auth
const TEST_GUILD = "SERVER_KAMU" // Server Lu

const commandFiles = fs.readdirSync('./perintah').filter(file => file.endsWith('.js'))

for (const file of commandFiles) {
    const command = require(`./perintah/${file}`)
    client.commands.set(command.perintah, command)
}

const api = new REST({ version: '10' }).setToken(token)

let slashfolder = fs.readdirSync('./slash')
var slash_commands = []

slashfolder.forEach(dir => {
    const slashcmd = fs.readdirSync(`./slash/${dir}`).filter(f => f.endsWith('.js'))
    for (var i in slashcmd) {
        var slashcmdFile = require(`./slash/${dir}/${slashcmd[i]}`)
        if (slashcmdFile) {
            client.slashCommands.set(slashcmdFile.perintah, slashcmdFile)
            slash_commands.push({
                perintah: slashcmdFile.perintah,
                description: slashcmdFile.description,
                type: slashcmdFile.type,
                options: slashcmdFile.options || null,
                default_permission: slashcmdFile.default_permission || null,
                default_member_permission: slashcmdFile.default_member_permissions ? PermissionsBitField.resolve(slashcmdFile.default_member_permissions).toString() : null
            })
        }
    }
})

const apps = fs.readdirSync(`./apps/`).filter(f => f.endsWith('.js'))
for (var i in apps) {
    var app = require(`./apps/${apps[i]}`)
    if (app) {
        client.slashCommands.set(app.name, app)
        slash_commands.push({
            name: app.name,
            type: app.type,
            default_permission: app.default_permission || null,
            default_member_permission: app.default_member_permissions ? PermissionsBitField.resolve(app.default_member_permissions).toString() : null
        })
    }
}

// Put Commands to Discord API
(async () => {
    try {
        if (TEST_GUILD) {
            await api.put(Routes.applicationGuildCommands(CLIENT_ID, TEST_GUILD), { body: slash_commands })
        } else {
            await api.put(Routes.applicationCommands(CLIENT_ID), { body: slash_commands })
        }
        console.log(`[ INFO ] Berhasil Terdaftar Slash Commands & Apps`.brightGreen)
    } catch (error) {
        console.log(error)
    }
})()

client.once("ready", () => {
    console.log(`[STATUS] ${client.user.tag} Sudah Online!\n[INFO] Bot by Renki INC\n[INFO] Bot serving on Ready to serve in ${client.guilds.cache.size} ${client.users.cache.size} users\n`)

    const activities = [
        { name: `My Renki`, type: 2 },
        { name: `${client.users.cache.size} users`, type: 0 },
        { name: `Type .menu to see menus!`, type: 3 },
    ]

    let i = 0
    setInterval(() => {
        if (i >= activities.length) i = 0
        client.user.setActivity(activities[i].name, { type: activities[i].type })
        client.user.setStatus('idle')
        i++
    }, 5000)
})

client.on('messageCreate', async message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return

    const args = message.content.slice(prefix.length).trim().split(/ +/)
    const commandName = args.shift().toLowerCase() 

    console.log(`[ SERVER ]: ${message.guild.name}`)
    console.log(`[ PERINTAH ]: ${commandName}`)
    console.log(`[ PESAN ]: ${message.content}`)

    if (!client.commands.has(commandName)) return

    const command = client.commands.get(commandName)

    try {
        await command.sekai(client, message, args)
    } catch (error) {
        console.error(error)
        message.reply('There was an error executing that command!')
    }
})

client.login(token)
￼Enter                type: slashcmdFile.type,
                options: slashcmdFile.options || null,
                default_permission: slashcmdFile.default_permission || null,
                default_member_permission: slashcmdFile.default_member_permissions ? PermissionsBitField.resolve(slashcmdFile.default_member_permissions).toString() : null
            })
        }
    }
})

const apps = fs.readdirSync(`./apps/`).filter(f => f.endsWith('.js'))
for (var i in apps) {
    var app = require(`./apps/${apps[i]}`)
    if (app) {
        client.slashCommands.set(app.name, app)
        slash_commands.push({
            name: app.name,
            type: app.type,
            default_permission: app.default_permission || null,
            default_member_permission: app.default_member_permissions ? PermissionsBitField.resolve(app.default_member_permissions).toString() : null
        })
    }
}

// Put Commands to Discord API
(async () => {
    try {
  if (TEST_GUILD) {
            await api.put(Routes.applicationGuildCommands(CLIENT_ID, TEST_GUILD), { body: slash_commands })
        } else {
            await api.put(Routes.applicationCommands(CLIENT_ID), { body: slash_commands })
        }
        console.log(`[ INFO ] Berhasil Terdaftar Slash Commands & Apps`.brightGreen)
    } catch (error) {
        console.log(error)
    }
})()

client.once("ready", () => {
    console.log(`[STATUS] ${client.user.tag} Sudah Online!\n[INFO] Bot by Renki INC\n[INFO] Bot serving on Ready to serve in ${client.guilds.cache.size} ${client.users.cache.size} users\n`)

    const activities = [
        { name: `My Renki`, type: 2 },
        { name: `${client.users.cache.size} users`, type: 0 },
        { name: `Type .menu to see menus!`, type: 3 },
    ]

    let i = 0
    setInterval(() => {
        if (i >= activities.length) i = 0
        client.user.setActivity(activities[i].name, { type: activities[i].type })
        client.user.setStatus('idle')
        i++
