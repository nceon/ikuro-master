const discord = require('discord.js');
const client = new discord.Client();

const os = require('os');

const { bannedWords } = require('./bannedWords.json');
const { prefix, botAdmin, botToken, consoleToken, answers } = require('./cfg.json');

function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

client.once('ready', () => {
    console.log('I am ready to serve people.')
    console.log(`Logged in as ${consoleToken}`)
});

client.on('ready', () => {
    console.log('Loaded undefined CPU cores')
    console.log(os.cpus())
    console.log('Loaded undefined GPU cores')
    console.log('ready')
});

process.once('ready', () => {
    exec('node ./bootLoader')
});

// filtering system
let filteredWords = new discord.MessageEmbed()
 .setTitle('Ikuro System')
 .setDescription('Your message was deleted because it included a banned word.\n > **Please abide by Ikuro gu,delines next time.**')
 .setColor('b52121')
 .setFooter('Ikuro Manager | Made & Operated by e9veee')
//

client.on('message', message => {
    if (message.author.id === botAdmin) return;
    if (bannedWords.some(word => message.content.toLowerCase().includes(word))) {
        if (message.author.bot) return;
        message.delete({ timeout: 0.1 })
        .then(msg => msg.channel.send(filteredWords))
        .catch(console.error)
        }
});
// end of filter


// server info command

client.on('message', message => {
    if (!message.guild) return;
    if (message.content === `${prefix}serverinfo`) {
        const serverinfoEmbed = new discord.MessageEmbed()
        .setColor('#e69019')
        .setThumbnail(`${message.guild.iconURL()}`)
        .setAuthor(`${message.author.username}`, `${message.author.displayAvatarURL()}`)
        .setFooter('Ikuro Manager | Made & Operated by e9veee')
        .setTitle(`${message.guild.name}\'s Information`)
        .setDescription(`Server Information about **Ikuro**`)
        .addFields(
            { name: 'Server Name', value: `${message.guild.name}`},
            { name: 'Server ID', value: `${message.guild.id}`},
            { name: 'Owner:', value: `${message.guild.owner}`},
            { name: 'Owner ID', value: `${message.guild.ownerID}`},
            { name: 'Server Creation Date', value: `${message.guild.createdAt}`},
            { name: 'Member Amount', value: `${message.guild.memberCount}`},
            { name: 'Verifiction Level', value: `${message.guild.verificationLevel}`},
            { name: 'Region', value:`${message.guild.region}`},
        )
        .setTimestamp()
    
    message.channel.send(serverinfoEmbed);
    }
});

client.on('message', message => {
    if (message.content === `${prefix}shutdown`) {
        if (!message.author.id === botAdmin) {
            return message.channel.send('<:xemoji:637099721680486433> **You do not have enough permisssions to execute this command.**')
        }
        process.exit()
    }
});

// afk command

client.on('message', message => {
    if (!message.guild) return; 
    if (message.content === `${prefix}afk`) {
      const member = message.guild.member(message.author)
      member.setNickname(`[AFK] ${message.member.nickname}`)
      message.channel.send(`${message.author}, I set you as AFK!`) 
    }
});

client.on('message', message => {
    if (message.content === `${prefix}unafk`) {
        message.channel.send(`${message.author}, I'm sorry but this command is not implemented yet! Check back later.`)
    }
});

client.on('message', message => {
    if (message.content === `${prefix}whois`) {
        const userEmbed = new discord.MessageEmbed()
         .setColor('#e69019')
         .setTitle('Who are you?')
         .setFooter('Ikuro Manager | Made & Operated by e9veee')
         .addFields(
            { name: 'Username', value: `${message.author.username}`, inline: true},
            { name: 'Discriminator', value: `${message.author.discriminator}`, inline: true},
            { name: 'User ID', value: `${message.author.id}`, inline: true},
            { name: 'Join Date', value: `${message.author.createdAt}`, inline: true},
         )
    message.channel.send(message.author, userEmbed)
    }
});

// current members command

client.on('message', message => {
    if (!message.guild) return;
    if (message.content === `${prefix}members`) {
     const membersEmbed = new discord.MessageEmbed()
     .setColor('#e69019')
     .setTitle('Members Counter')
     .setDescription(`Ikuro currently has ${message.guild.memberCount} members in the Discord server.`)
     .setFooter('Ikuro Manager | Made & Operated by e9veee')
    message.channel.send(membersEmbed); 
    }
});


client.on('guildMemberAdd', () => {
    const welcomeMessage = new discord.MessageEmbed()
     .setTitle('Welcome to Ikuro!')
     .setDescription('Thank you for joining us, before you start to chat please verify your account and read the rules. <a:check_black:744507192912117800>\nEnjoy your time here!')
     .setFooter('Ikuro Manager | Made & Operated by e9veee')
     .setColor('#e69019')
    const discussion = client.channels.cache.get('751174076198027304')
    discussion.send(welcomeMessage)
});


client.on('message', message => {
    if (message.content === `<@!755695611549974580>`) {
        const reply = new discord.MessageEmbed()
         .setDescription('Hi! My prefix is `.`\nDo `.help` for my commands list')
         .setColor('#e69019')
         .setFooter('Ikuro Manager | Made & Operated by e9veee')
    message.channel.send(message.author, reply)
    }
});

client.on('message', message => {
    if (!message.guild) return;
    if(!message.member) return;
    if(!message.member.hasPermission("KICK_MEMBERS")) return;
     const questionKick = new discord.MessageEmbed()
       .setDescription(`You did not specify an account to kick to.`)
       .setColor('#e31e1e')
       .setFooter('Ikuro Manager | Made & Operated by e9veee')
       .setTimestamp()
      const errorKick = new discord.MessageEmbed()
       .setDescription(`<a:fail:745264057497550859> | I couldn't find that account in in this server!`)
       .setColor('#e31e1e')
       .setFooter('Ikuro Manager | Made & Operated by e9veee')
       .setTimestamp()
      const error2Kick = new discord.MessageEmbed()
       .setDescription(`<a:fail:745264057497550859> | I'm unable to kick this member. Please check if I have enough permissions to kick this member!`)
       .setColor('#e31e1e')
       .setFooter('Ikuro Manager | Made & Operated by e9veee')
       .setTimestamp()
      const successKick = new discord.MessageEmbed()
       .setDescription(`<a:success:745264106889805894> | I have successfully kicked the user you specified.`)
       .setColor('#14e36a')
       .setFooter('Ikuro Manager | Made & Operated by e9veee')
       .setTimestamp()
      if (message.content.startsWith('!kick')) {
         const user = message.mentions.users.first();
         if (user) {
           if (member) {
             member
               .kick(`${message.author.user} has kicked this person.`)
               .send('You have been **banned** from Ikuro due to violating Ikuro Guidelines.')
               .then(() => {
                   message.channel.send(successKick);
               })
               .catch(err => {
                   message.channel.send(error2Kick);
                 console.error(err);
               });
           } else {
               message.channel.send(errorKick);
           }
         } else {
           message.channel.send(questionKick);
         }
       }
});


client.on('message', message => {
    if (!message.guild) return;
    if(!message.member) return;
    if(!message.member.hasPermission("BAN_MEMBERS")) return;
 const questionKick = new discord.MessageEmbed()
   .setDescription(`You did not specify an account to ban to.`)
   .setColor('#e31e1e')
   .setFooter('Ikuro Manager | Made & Operated by e9veee')
   .setTimestamp()
  const errorKick = new discord.MessageEmbed()
   .setDescription(`<a:fail:745264057497550859> | I couldn't find that account in in this server!`)
   .setColor('#e31e1e')
   .setFooter('Ikuro Manager | Made & Operated by e9veee')
   .setTimestamp()
  const error2Kick = new discord.MessageEmbed()
   .setDescription(`<a:fail:745264057497550859> | I'm unable to ban this member. Please check if I have enough permissions to ban this member!`)
   .setColor('#e31e1e')
   .setFooter('Ikuro Manager | Made & Operated by e9veee')
   .setTimestamp()
  const successKick = new discord.MessageEmbed()
   .setDescription(`<a:success:745264106889805894> | I have successfully banned the user you specified.`)
   .setColor('#14e36a')
   .setFooter('Ikuro Manager | Made & Operated by e9veee')
   .setTimestamp()
  if (message.content.startsWith('!kick')) {
     const user = message.mentions.users.first();
     if (user) {
       const member = message.guild.member(user);
       if (member) {
         member
           .kick(`${message.author.user} has banned this person.`)
           .send('You have been **banned** from Ikuro due to violating Ikuro Guidelines.')
           .then(() => {
               message.channel.send(successKick);
           })
           .catch(err => {
               message.channel.send(error2Kick);
             console.error(err);
           });
       } else {
           message.channel.send(errorKick);
       }
     } else {
       message.channel.send(questionKick);
     }
   }
});


client.on('message', message => {
    if (message.content === `${prefix}help`) {
        const helpEmbed = new discord.MessageEmbed()
         .setTitle('Executable Commands List')
         .setDescription('These commands are publicly available, anyone may execute these commands. Other commands for staff will be listed in other category.')
         .setFooter('Ikuro Manager | Made & Operated by e9veee')
         .setColor('#e69019')
         .addFields(
             { name: 'Public Executable Commands', value: `${prefix}help\n${prefix}members\n${prefix}whois\n${prefix}afk\n${prefix}unafk - **NOT IMPLENTED YET**\n${prefix}serverinfo\n${prefix}suggest\n${prefix}8ball`},
             { name: 'Staff Executable Commands', value: `${prefix}ban\n${prefix}kick\n${prefix}status`},
             { name: '​             ', value: 'Suggest commands in #suggestions!'}
         )
    message.channel.send(helpEmbed);
    console.log(`> Help command used by ${message.author.username}`);
    }
});

client.on("message", async message => {
    if(message.author.bot) return;
      if(message.channel.type === "dm") return;
      
      let messageArray = message.content.split(" ");
      let command = messageArray[0];
      let args = messageArray.slice(1);
      let com = command.toLowerCase();
  
  if(com === `!8ball`) {
      
      // Runs if user doesn't ask a question
      if(!args[0]){
          message.channel.send(`You didn't provide any arguments! :(`)
          return;
      }
      const index = Math.floor(Math.random() * (answers.length -1) + 1);    
          message.channel.send(answers[index]);
          return console.log(`> 8ball command used by ${message.author.username}`);
      // Displays a message in the console if the command was used
      }
})

client.on("message", async message => {
    if(message.author.bot) return;
      if(message.channel.type === "dm") return;
      if(!message.author.id === botAdmin) {
          return message.channel.send('<:xemoji:637099721680486433> **You do not have enough permisssions to execute this command.**');
      }
      
      let messageArray = message.content.split(" ");
      let command = messageArray[0];
      let args = messageArray.slice(1);
      let com = command.toLowerCase();
  
  if(com === `${prefix}status`) {
      
      if(!args[0]){
          message.channel.send(`Please provide a valid argument to set the status.`)
          return;
      } 
          client.user.setActivity(`${args[0]}`, { type: 'PLAYING' })
          message.channel.send(`:white_check_mark: **I have set my status to** ${args[0]}`);
          return console.log(`> Status command used by ${message.author.username}`);
      }
})

client.on("message", async message => {
    if(message.author.bot) return;
      if(message.channel.type === "dm") return;
      
      let messageArray = message.content.split(" ");
      let command = messageArray[0];
      let args = messageArray.slice(1);
      let com = command.toLowerCase();
  
  if(com === `${prefix}suggest`) {
      
      if(!args[0]){
          message.channel.send(`Please provide a valid argument to send the suggestion.`)
          return;
      } 
      message.channel.send(`${message.author}, thank you for suggesting. Our staff will go over your suggestion and determine if we will add it or not. Be patient during this process!`)
      const suggestion = new discord.MessageEmbed()
       .setTitle('Suggestion')
       .setDescription(args[0])
       .setFooter('Ikuro Manager | Made & Operated by e9veee')
       .setColor('#e69019')
      const suggestionChannel = client.channels.cache.get('758409556995866624')
      suggestionChannel.send(`${message.author}`, suggestion);
      }
})


client.on('message', message => {
    if (message.content === `${prefix}botinfo`) {
        const botstats = new discord.MessageEmbed() 
            .setFooter('Ikuro Manager | Made & Operated by e9veee')
            .setDescription('​            ')
            .setColor('#e69019')
            .setTitle('Ikuro Manager Information')
            .addFields(
                { name: 'Library', value: 'Eris & DiscordJS', inline: true },
                { name: 'Bot Developer', value: '<@!727887715869261864>', inline: true },
                { name: 'Uptime', value: `Down until bug is fixed`, inline: true },
                { name: 'Free Memory', value: `${formatBytes(os.freemem())}`, inline: true },
                { name: 'Total Memory', value: `${formatBytes(os.totalmem())}`, inline: true },
                { name: 'CPU Usage', value: `Down until bug is fixed`, inline: true },
                { name: 'Loaded Commands', value: '14'}
            )
    message.channel.send(botstats)    
    }
});

process.on('unhandledRejection', error => console.error('Uncaught Promise Rejection Error:\n', error))
client.on('error', error => console.error(error));
client.on('warn', warning => console.warn(warning));
client.on('debug', debug => console.debug(debug));

client.login('NzU1Njk1NjExNTQ5OTc0NTgw.X2HCYQ.IIcKL5dwFKKluY19dAIJb86VVUo')
