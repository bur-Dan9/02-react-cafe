import css from "./App.module.css";

import CafeInfo from "../CafeInfo/CafeInfo";
import VoteOptions from "../VoteOptions/VoteOptions";
import VoteStats from "../VoteStats/VoteStats";
import Notification from "../Notification/Notification";

import { useState } from "react";
import type { Votes } from '../../types/votes'
import type { VoteType } from '../../types/votes'

const initialVotes: Votes = {
  good: 0,
  neutral: 0,
  bad: 0,
};

export default function App() {
  const [votes, setVote] = useState<Votes>(initialVotes);

  const handleVote = (type: VoteType) => {
    setVote({
      ...votes,
      [type]: (votes[type] ?? 0) + 1,
    });
  };

  const resetVotes = () => {
    setVote(initialVotes);
  };

  const totalVotes =
    (votes.good ?? 0) + (votes.neutral ?? 0) + (votes.bad ?? 0);
  const positiveRate =
    totalVotes === 0 ? 0 : Math.round(((votes.good ?? 0) / totalVotes) * 100);

  return (
    <div className={css.app}>
      <CafeInfo />
      <VoteOptions
        onVote={handleVote}
        onReset={resetVotes}
        canReset={totalVotes !== 0 ? true : false}
      />
      {totalVotes !== 0 ? (
        <VoteStats
          votes={votes}
          totalVotes={totalVotes}
          positiveRate={positiveRate}
        />
      ) : (
        <Notification />
      )}
    </div>
  );
}