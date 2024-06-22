import Matches from "../components/matchesList";
import Header from "../components/header";

export default function MatchesPage() {
    return (
      <>
        <Header
          heading="Matches"
          paragraph="Back to Home"
          linkName="Home"
          linkUrl="/home"
        />
        <Matches/>
      </>
    );
  }