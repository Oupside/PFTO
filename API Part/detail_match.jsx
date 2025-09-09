"use client"
import { getItemImagesFromMatch, getChampionImageFromMatch, getSpellsImageFromMatch, getPerksImageFromMatch, getmatchSummonerTier, calculateCSPerMinute, teamTotalKills, killParticipation } from "@/services/match";
import { kdaRatio } from "@/services/Summoner";
import Image from "next/image";
import { useState } from "react";
import BuildInfo from "./Build";
import Tooltip from "@/components/Tooltip";
const renderDamageBar = (damageDealt, damageReceived, maxDamage) => {
    const dealtPercentage = (damageDealt / maxDamage) * 100;
    const receivedPercentage = (damageReceived / maxDamage) * 100;

    return (
      <div className="flex flex-col items-center">
        <div className="flex justify-between w-full text-xs mb-1">
          <span className="text-red-500">{damageDealt.toLocaleString()}</span>
          <span className="text-green-500">{damageReceived.toLocaleString()}</span>
        </div>
        <div className="flex w-full space-x-2">
          <div className="w-24 h-3 bg-gray-300 relative overflow-hidden">
            <div className="bg-red-500 h-full" style={{ width: `${dealtPercentage}%` }}></div>
          </div>
          <div className="w-24 h-3 bg-gray-300 relative overflow-hidden">
            <div className="bg-green-500 h-full" style={{ width: `${receivedPercentage}%` }}></div>
          </div>
        </div>
      </div>
    );
};


// const teamTotalDamagebar = (blue, red) => {
//     const redkills = red.objectives.champion.kills;
//     const bluekills = blue.objectives.champion.kills;
//     const totalkills = redkills + bluekills;
//     const redkills_percentage = (redkills / totalkills) * 100;
//     const bluekills_percentage = (bluekills / totalkills) * 100;


//     return (
//         <>
//         <div className="flex w-full space-x-2">
//           <div className="relative w-48 h-4 bg-blue-500 overflow-hidden rounded-lg" style={{ width: `${bluekills_percentage}%` }}>
//             <div className="bg-red-500 h-full rounded-l-lg" style={{ width: `${redkills_percentage}%` }}></div>
//             <div className="absolute top-0 left-[86px] text-white text-sm">Total kills</div>
//             <div className="absolute top-0 left-0 text-sm" >Red</div>
//             <div className="absolute top-0 right-[-1px] text-sm">Blue</div>
//           </div>
//         </div>
//         </>
//     )
    
// }

const ItemImage = (summoner) => {
    const Items = getItemImagesFromMatch(summoner);
    const itemboxStyle = {
        backgroundColor: summoner.win === true ? 'rgb(186, 230, 253)' : 'lightcoral'
    };
    return (
        <>
            <div className="flex flex-col w-44 ">
                <div className="flex ">
                    {Items.itemImages.slice(0, 3).map((item, index) => (
                        item ? (
                            <Tooltip itemId={Items.itemIds[index]} type={'Item'} >
                                <Image key={index} src={item} alt={`Item ${index}`} width={10} height={10} className="rounded w-6 h-6 mr-1" />
                            </Tooltip>
                        ) : (
                            <div key={index} className="w-6 h-6 rounded bg-opacity-80 mr-1" style={itemboxStyle}></div>
                        )
                    ))}
                </div>
                <div className="flex mt-1 pr-2 mb-1">
                    {Items.itemImages.slice(3, 7).map((item, index) => (
                        item ? (
                            <Tooltip itemId={Items.itemIds[index + 3]} type={'Item'} >
                                <Image key={index + 3} src={item} alt={`Item ${index + 3}`} width={10} height={10} className="rounded w-6 h-6 mr-1" />
                            </Tooltip>
                        ) : (
                            <div key={index + 3} className="w-6 h-6 rounded bg-opacity-80 mr-1" style={itemboxStyle}></div>
                        )
                    ))}
                </div>
            </div>
        </>
    )
}

const renderTeam = (player, team, maxDamage, gameTime) => {
    let message = team.win ? '승리' : '패배';
    let teamBgColor = team.win ? 'bg-blue-100' : 'bg-red-100';

    return (
        <>
            <div className={`p-1 rounded mb-1 ${teamBgColor}`}>
                <div className="grid grid-cols-8 text-xs font-medium mb-1" style={{ gridTemplateColumns: "90px 100px 100px 90px 120px 80px 100px 120px" }}>
                    <div className="text-left">{message}</div>
                    <div className="text-center">닉네임</div>
                    <div className="text-center">KDA</div>
                    <div className="text-center">킬관여</div>
                    <div className="text-start">피해량 / 받은 피해량</div>
                    <div className="text-center pl-4">시야 점수</div>
                    <div className="text-center">CS</div>
                    <div className="text-center mr-4">아이템</div>
                </div>
            </div>
            {player.map((player, index) => (
                <div key={index} className={`grid grid-cols-8 items-center rounded mb-1 text-xs h-14 w-auto  ${teamBgColor}`} style={{ gridTemplateColumns: "100px 100px 100px 80px 120px 80px 100px 120px" }}>
                    <div className="flex  justify-center text-xs">
                        <div className="relative">
                            <Image
                                src={getChampionImageFromMatch(player.championName)}
                                alt={player.championName}
                                width={40}
                                height={40}
                                className="object-cover rounded-full"
                            />
                            <div className="absolute bottom-1 left-0 bg-black text-white text-xs p-[1px] w-[18px] h-[18px] rounded-full flex items-center justify-center">
                                {player.champLevel}
                            </div>
                        </div>
                        <div className="text-center flex items-center text-xs">
                            <div className='flex'>
                                <div className='flex flex-col mr-1'>
                                    <Tooltip itemId={player.firstSpell} type={"Spell"}>
                                        <Image src={getSpellsImageFromMatch(player.firstSpell)} width={24} height={24} alt="Spell 1" className='rounded-md mb-1' quality={100} />
                                    </Tooltip>
                                    <Tooltip itemId={player.SecondSpell} type={"Spell"}>
                                        <Image src={getSpellsImageFromMatch(player.SecondSpell)} width={24} height={24} alt="Spell 2" className='rounded-md ' quality={100} />
                                    </Tooltip>
                                </div>
                                <div className='flex flex-col'>
                                    <Tooltip itemId={player.perks.styleperks[0].selections[0].perk} type={"Rune"}>
                                        <Image src={getPerksImageFromMatch(player.perks.styleperks[0].selections[0].perk)} width={20} height={20} alt="스텟1" className="border border-black rounded-full bg-black" quality={100} />
                                    </Tooltip>
                                    <Image src={getPerksImageFromMatch(player.perks.styleperks[1].style)} width={20} height={20} alt="스텟2" quality={100} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col ">
                        <div className="truncate">{player.gameName}#{player.tag}</div>
                        <div className="text-gray-500">{getmatchSummonerTier}</div>
                    </div>
                    <div className="text-center text-xs">
                        {player.kills} / {player.deaths} / {player.assists}
                        <div className="text-center text-xs">
                            {kdaRatio(player.kills, player.deaths, player.assists)}
                        </div>
                    </div>
                    <div className="text-center flex-col items-center justify-center text-xs">{killParticipation(team.objectives.champion.kills, player.kills, player.assists)}%</div>
                    <div className="text-center">
                        {renderDamageBar(player.damage_to_Champion, player.damageTaken, maxDamage)}
                    </div>
                    <div className="text-center flex items-center justify-center text-xs pl-4">
                        {player.visionScore} Score
                    </div>
                    <div className="flex-col items-center text-xs text-center">
                        {player.cs}
                        <div className="">
                            ({calculateCSPerMinute(gameTime, player.cs)}/분)
                        </div>
                    </div>
                    {/* Updated Item Rendering with 3 on the first row, 4 on the second */}
                    <div className="pt-[0.3px] items-start justify-start">
                        {ItemImage(player)}
                    </div>
                </div>
            ))}
        </>
    )
}


export default function DetailMatchHistory({ Red, Blue, gameTime, teams, timeline_data, player, perks, spellInfo }) {
    const blue_team = teams.find(team => team.teamId === 100);
    const red_team = teams.find(team => team.teamId === 200);
    const allPlayers = [...Red, ...Blue];
    const maxDamage = Math.max(...allPlayers.map((player) => player.damage_to_Champion));
    const [isBuildActive, setIsBuildActive] = useState(false);

    const handleBuildClick = () => {
        setIsBuildActive(true);
    };

    const handleSummaryClick = () => {
        setIsBuildActive(false);
    };
    return (
        <div className="flex flex-col items-center">
            <div className="bg-white shadow-lg rounded-lg w-[800px] h-full mx-auto">
                <div className="flex justify-center gap-2 mb-1">
                    <div 
                        className={`py-2 px-4 font-semibold rounded cursor-pointer ${!isBuildActive ? 'bg-gray-100' : ''}`}
                        onClick={handleSummaryClick}
                    >
                        종합
                    </div>
                    <div 
                        className={`py-2 px-4 font-semibold rounded cursor-pointer ${isBuildActive ? 'bg-gray-100' : ''}`}
                        onClick={handleBuildClick}
                    >
                        빌드
                    </div>
                </div>
                {isBuildActive ? (
                    <BuildInfo timeline_data={timeline_data} player={player} perks={perks} spellInfo={spellInfo} />
                ) : (
                    <>
                        {renderTeam(Red, red_team, "bg-red-50", maxDamage, gameTime)}
                        {renderTeam(Blue, blue_team, "bg-blue-50", maxDamage, gameTime)}
                    </>
                )}
            </div>
        </div>
    );
}