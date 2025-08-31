import { world ,system} from "@minecraft/server";
world.afterEvents.playerSpawn.subscribe(ev => {
    if (ev.initialSpawn && !world.getDynamicProperty('iniMessage')) {
        world.sendMessage('オリシスアドオンをダウンロードしていただきありがとうございます。詳しい説明は クラフターズコロニー をご覧ください')
        world.sendMessage('この先の道は苦難が伴うだろう...')
    
        world.setDynamicProperty('iniMessage',true);
        world.getAllPlayers()[0].runCommand(`function Osiris/setup`)
    }
})

