import { world ,system} from "@minecraft/server";
world.afterEvents.playerSpawn.subscribe(ev => {
    if (ev.initialSpawn && !world.getDynamicProperty('iniMessage')) {
        world.sendMessage('オリシスアドオンをダウンロードしていただきありがとうございます。詳しい説明は クラフターズコロニー をご覧ください')
        world.sendMessage('この先の道は苦難が伴うだろう...')
    
        world.setDynamicProperty('iniMessage',true);
        world.getAllPlayers()[0].runCommand(`function Osiris/setup`)
    }
})
//寝たら回復
const sleepBool = new Map()
const sleepTime = new Map()
system.runInterval(()=>
{
    for (const player of world.getAllPlayers())
    {
        if(player.isSleeping)
        {
         sleepBool.set(player.id,true)
         if(!sleepTime.has(player.id)) sleepTime.set(player.id,0);
         sleepTime.set(player.id,sleepTime.get(player.id)+1)
         world.sendMessage(`${sleepTime.get(player.id)}`)

        }
        else
        {
            
          if(sleepBool.get(player.id) && sleepTime.get(player.id) >= 99)
          {
            const hpComp = player.getComponent("minecraft:health")
            try{
            hpComp.setCurrentValue(hpComp.currentValue + 20);//hpを20回複
            }
            catch(c)
            {
            hpComp.resetToMaxValue();//hpを全回復
            }
          }
          sleepTime.set(player.id,0)
          sleepBool.set(player.id,false)
        }
        
    }
})
