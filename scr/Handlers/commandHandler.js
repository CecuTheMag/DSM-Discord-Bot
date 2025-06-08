const ascii = require("ascii-table");
const fs = require("fs");
const path = require("path");

function loadCommands(client) {
    const table = new ascii().setHeading("Commands", "Status");
    let commandsArray = [];

    const commandsFolder = fs.readdirSync(path.join(__dirname, "../Commands"));
    for (const folder of commandsFolder) {
        const folderPath = path.join(__dirname, "../Commands", folder);
        const commandFiles = fs.readdirSync(folderPath).filter((file) => file.endsWith(".js"));

        for (const file of commandFiles) {
            const commandFile = require(path.join(folderPath, file));

            if (!commandFile.data || !commandFile.data.name) {
                table.addRow(file, "❌  Missing data or name");
                continue;
            }

            client.commands.set(commandFile.data.name, commandFile);
            commandsArray.push(commandFile.data.toJSON());
            table.addRow(file, "loaded");
        }
    }

    client.application.commands.set(commandsArray);

    console.log(table.toString(), "\nLoaded Commands");
}

module.exports = { loadCommands };
