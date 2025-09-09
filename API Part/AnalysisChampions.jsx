import { getChampionImageFromMatch } from "@/services/match";
import translations from "@/locale/index"
import { win_rate } from "@/services/Summoner";
import { useRouter } from "next/navigation";
import { debounce } from 'lodash';
import { useState } from 'react';
import Tooltip from "@/components/Tooltip";

function ChampionList({ title, champions, showSynergy }) {
    const [showAll, setShowAll] = useState(false);
    const displayedChampions = showAll ? champions : champions.slice(0, 8);
    const router = useRouter();

    const handleChampionClick = (championName) => {
        router.push(`/DeepAnalysis?champion=${championName}`);
    };

    const getBackgroundColor = () => {
        if (title === "상대하기 어려운 챔피언") {
            return 'bg-red-100';  // 연한 빨간색 배경
        } else if (title === "상대하기 좋은 챔피언") {
            return 'bg-blue-100';  // 연한 파란색 배경
        }
        return 'bg-green-100';  // 연한 초록색 배경
    };

    const getWinrateColor = (champion) => {
        if (title === "상대하기 어려운 챔피언") {
            return 'bg-red-500';  // 진한 빨간색 승률 표시
        } else if (title === "상대하기 좋은 챔피언") {
            return 'bg-blue-500';  // 진한 파란색 승률 표시
        }
        return 'bg-green-500';  // 진한 초록색 승률 표시
    };

    const getWinrateText = (champion) => {
        const winRate = win_rate(champion.wins, champion.losses);
        if (title === "상대하기 어려운 챔피언") {
            return `${winRate.toFixed(0)}%`;
        } else if (title === "상대하기 좋은 챔피언") {
            return `${winRate.toFixed(0)}%`;
        }
        return `${Math.abs(50 - winRate).toFixed(0)}%`;
    };

    return (
        <div className={`${getBackgroundColor()} rounded-lg p-4 shadow-md`}>
            <h2 className="text-lg font-bold text-center mb-4">{title}</h2>
            <div className="grid grid-cols-4 gap-2">
                {displayedChampions.map((champion, index) => (
                    <Tooltip
                        key={index}
                        type="Champion"
                        data={champion}>
                        <div 
                            className="relative w-12 h-12 cursor-pointer hover:opacity-80 transition-opacity"
                            onClick={() => handleChampionClick(champion.name)}
                        >
                            <img
                                src={getChampionImageFromMatch(champion.name)}
                                alt={translations.ko[champion.name]}
                                className="w-full h-full rounded-lg"/>
                            <div className={`absolute bottom-0 right-0 ${getWinrateColor(champion)} text-white text-xs px-1 py-0 rounded-tl rounded-br z-10`}>
                                {getWinrateText(champion)}
                            </div>
                        </div>
                    </Tooltip>
                ))}
            </div>
            {champions.length > 8 && (
                <button
                    onClick={() => setShowAll(!showAll)}
                    className="w-full mt-4 text-sm text-gray-600 hover:text-gray-800">
                    더 보기
                </button>
            )}
        </div>
    );
}

export default function AnalysisChampions({ recordAdvantageousChampions, recordDisadvantageousChampions, recordSynergisticChampions }) {
    return (
        <div className="grid grid-cols-3 gap-4 p-4">
            <ChampionList
                title="상대하기 어려운 챔피언"
                champions={recordDisadvantageousChampions}
            />
            <ChampionList
                title="상대하기 좋은 챔피언"
                champions={recordAdvantageousChampions}
            />
            <ChampionList
                title="상성 좋은 챔피언"
                champions={recordSynergisticChampions}
                showSynergy={true}
            />
        </div>
    );
}