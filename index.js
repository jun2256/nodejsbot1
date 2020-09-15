const Discord = require('discord.js');
const client = new Discord.Client();
const token = process.env.token;

client.on('ready', () => {
  console.log('켰다.');
});

client.on("guildMemberAdd", (member) => {
  const guild = member.guild;
  const newUser = member.user;
  const welcomeChannel = guild.channels.find(channel => channel.name == welcomeChannelName);

  welcomeChannel.send(`<@${newUser.id}> ${welcomeChannelComment}\n`);
});

client.on('message', (message) => {
  if(message.author.bot) return;

  if(message.content == '케이') {
    return message.reply('단수의 주인님이자, ICY서버 가이드 후덜덜... 멋지고! 잘생기고! 노래 잘부르는 멋진 냠쟈~👍 😍 ');
  }

  if(message.content == ('ICY')) {
    let img = 'https://cdn.discordapp.com/attachments/749526082822340621/749526490143653918/SPOILER_.jpg';
    let embed = new Discord.RichEmbed()
      .setTitle('쿠팡존잘')
      .setURL('http://icyonline.kr/')
      .setAuthor('최예나', img, 'https://www.youtube.com/watch?v=mVB8UkcnU_s')
      .setThumbnail(img)
      .addBlankField()
      .addField('최예나존예', '최예나면킹정이지..')
      .addField('조유리존예', '조유리면킹정이지..', true)
      .addField('현빈존잘', '쿠팡잘생김', true)
      .addField('쿠팡존잘', '준잘생김', true)
      .addField('쿠팡이 잘생긴 이유', '1.그냥잘생김\n2.얼굴이예쁨\n3.그냥예쁨\n')
      .addBlankField()
      .setTimestamp()
      .setFooter('쿠팡존잘이라고', img)

    message.channel.send(embed)
  } else if(message.content == 'embed2') {
    let helpImg = 'https://images-ext-1.discordapp.net/external/RyofVqSAVAi0H9-1yK6M8NGy2grU5TWZkLadG-rwqk0/https/i.imgur.com/EZRAPxR.png';
    let commandList = [
      {name: 'ping', desc: '현재 핑 상태'},
      {name: 'embed', desc: 'embed 예제1'},
      {name: 'embed2', desc: 'embed 예제2 (help)'},
      {name: '!전체공지', desc: 'dm으로 전체 공지 보내기'},
    ];
    let commandStr = '';
    let embed = new Discord.RichEmbed()
      .setAuthor('Help of 콜라곰 BOT', helpImg)
      .setColor('#186de6')
      .setFooter(`콜라곰 BOT ❤️`)
      .setTimestamp()
    
    commandList.forEach(x => {
      commandStr += `• \`\`${changeCommandStringLength(`${x.name}`)}\`\` : **${x.desc}**\n`;
    });

    embed.addField('Commands: ', commandStr);

    message.channel.send(embed)
  }

  if(message.content.startsWith('!전체공지')) {
    if(checkPermission(message)) return
    if(message.member != null) { // 채널에서 공지 쓸 때
      let contents = message.content.slice('!전체공지'.length);
      message.member.guild.members.array().forEach(x => {
        if(x.user.bot) return;
        x.user.send(`<@${message.author.id}> ${contents}`);
      });
  
      return message.reply('공지를 전송했습니다.');
    } else {
      return message.reply('채널에서 실행해주세요.');
    }
  }
});

function checkPermission(message) {
  if(!message.member.hasPermission("MANAGE_MESSAGES")) {
    message.channel.send(`<@${message.author.id}> ` + "명령어를 수행할 관리자 권한을 소지하고 있지않습니다.")
    return true;
  } else {
    return false;
  }
}

function changeCommandStringLength(str, limitLen = 8) {
  let tmp = str;
  limitLen -= tmp.length;

  for(let i=0;i<limitLen;i++) {
      tmp += ' ';
  }

  return tmp;
}


client.login(token);