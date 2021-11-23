import { useState } from "react";
import Statistic from "./components/Statistic";
import FeedbackOptions from "./components/FeedbackOptions";
import Section from "./components/Section";
import Notification from "./components/Notification";
import "./App.css";

export default function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const onLeaveFeedback = (feedbackType) => {
    switch (feedbackType) {
      case "good":
        setGood((prev) => prev + 1);
        break;
      case "neutral":
        setNeutral((prev) => prev + 1);
        break;
      case "bad":
        setBad((prev) => prev + 1);
        break;
      default:
        return;
    }
  };

  const countTotalFeedback = () => {
    return neutral + good + bad;
  };

  const countPositiveFeedbackPercentage = () => {
    return good > 0 ? Math.ceil((good * 100) / countTotalFeedback()) : 0;
  };

  return (
    <div className="feedback-wrapper">
      <Section title="Please Leave Feedback">
        <FeedbackOptions
          types={["good", "neutral", "bad"]}
          onIncrement={onLeaveFeedback}
        />
      </Section>
      <Section title="Statistics">
        {countTotalFeedback() > 0 ? (
          <Statistic
            good={good}
            neutral={neutral}
            bad={bad}
            totalCount={countTotalFeedback()}
            goodPercnt={countPositiveFeedbackPercentage()}
          />
        ) : (
          <Notification title="No feedback given" />
        )}
      </Section>
    </div>
  );
}
