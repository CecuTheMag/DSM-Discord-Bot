const ascii = require('ascii-table');
const fs = require('fs');
const path = require('path');

function loadEvents(client) {
    const table = new ascii().setHeading('Events', 'Status');
    const eventsPath = path.join(__dirname, '../Events');
    const folders = fs.readdirSync(eventsPath);

    for (const folder of folders) {
        const folderPath = path.join(eventsPath, folder);
        const files = fs.readdirSync(folderPath).filter((file) => file.endsWith(".js"));

        for (const file of files) {
            const event = require(path.join(folderPath, file));

            if (event.rest) {
                if (event.once)
                    client.rest.once(event.name, (...args) => event.execute(...args, client));
                else
                    client.rest.on(event.name, (...args) => event.execute(...args, client));
            } else {
                if (event.once)
                    client.once(event.name, (...args) => event.execute(...args, client));
                else
                    client.on(event.name, (...args) => event.execute(...args, client));
            }
            table.addRow(file, "loaded");
        }
    }
    return console.log(table.toString(), "\nLoaded events");
}

module.exports = { loadEvents };