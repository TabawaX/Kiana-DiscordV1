const { EmbedBuilder } = require("discord.js")

module.exports = {
    perintah: "menu",
    description: "Show All Menu.",
    cooldown: 1000,
    sekai: async (client, message, args) => {

        let embed = new EmbedBuilder()
            .setColor(`#00bfff`) 
            .setTitle(`Kiana Multi Function`)
            .setDescription(`This Bot still in the development stage`) 
            .addFields(
		{ name: '!menu', value: 'Show Menus!' },
		{ name: '!ping', value: 'Show Bot Connection' },
	)

        message.reply({ embeds: [embed] })
    }
}
