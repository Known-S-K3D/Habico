// src/pages/Story.jsx
import React from "react";
import { useLocation } from "react-router-dom";
import InabelStory from "../components/Story/InabelStory";
import IkatStory from "../components/Story/IkatStory";
import KalingaStory from "../components/Story/KalingaStory";

const Story = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const category = queryParams.get("category"); // 'inabel', 'ikat', or 'kalinga'

  return (
    <div>
      
      {category === "inabel" && <InabelStory />}
      {category === "ikat" && <IkatStory />}
      {category === "kalinga" && <KalingaStory />}
      

      {/* If no category, show all */}
      {!category && (
        <>
          <InabelStory />
          <IkatStory />
          <KalingaStory />
        </>
      )}
    </div>
  );
};
export default Story;
