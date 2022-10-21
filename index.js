const readline = require(`readline-sync`)
const fs = require(`fs`)
let ini = require('ini');

let data, configLocation, config;

function save(){
  fs.writeFileSync(`./config.json`, JSON.stringify(data))
}

try{
  data = require(`./config.json`)
}catch{
  let r = readline.question(`No config.json file found. Create one? (y/n): `)
  if(r.toLowerCase() == `y` || r.toLowerCase() == `yes`){
    data = {
      v: 1,
      config: ``,
      defaultServer: "https://make.fangam.es"
    }
    save()
  }else{
    process.exit()
  }
}

while(!configLocation || !config){
  console.clear()
  try{
    config = ini.parse(fs.readFileSync(data.config, 'utf-8'))
    configLocation = data.config
  }catch(err){
    console.log(`Unable to find your IWM config.ini.

Windows:
Your config.ini will be in C:\\Users\\(user)\\AppData\\Local\\IWM

Linux:
1. Open your file manager
2. Navigate to /home/(user)/.local/share/Steam/steamapps/compatdata
3. Look through all the folders there until you find one with IWM in pfx/drive_c/users/steamuser/AppData/Local/ OR search for the "IWM" folder
4. Find the location of config.ini in the IWM folder
`)
    data.config = readline.question(`config.ini location: `)
  }
}

save()

function replaceServer(host){
  config.Server.Server_hostname = host
  config.Server.Server_hostname_fallback = host
}

function defaultServer(){
  config.Server.Server_hostname = "https://make.fangam.es"
  config.Server.Server_hostname_fallback = "http://make.fangam.es"
}

function saveConfigIni(){
  fs.writeFileSync(configLocation, ini.stringify(config))
}

console.clear()
console.log(`The IWM server replacer is not responsible for any damage to the game, or anything that's provided by the custom servers.`)
readline.question(`Hit any key to accept and continue.`)

while(true){
  console.clear()
  console.log(`Welcome to the IWM server replacer by coding398!

You can use this tool to make your I Wanna Maker client connect to a different server such as the IWM Horizons server (https://iwm.codingmaster398.repl.co).
You can also use it to revert to the default server.

Current server: ${config.Server.Server_hostname}

Options:
1. Revert to default server
2. Change server
3. Exit
`)

  let option = Number(readline.question(`Choose: `))

  switch(option){
    case 1:
      defaultServer()
      saveConfigIni()
      break;
    case 2:
      replaceServer(readline.question(`New server: `))
      saveConfigIni()
      break;
    case 3:
      save()
      saveConfigIni()
      process.exit()
      break;
  }
}
